/**
 * useCompression.js — Phase 2/5 (PDF wired; image/document stubs ready)
 *
 * Central orchestration hook. Replaces the fake setInterval simulation
 * in App.jsx with real pdf-lib compression.
 *
 * State machine:  idle → processing → done
 *                              ↓
 *                          (cancel) → idle
 *                              ↓
 *                           error → idle (via reset)
 */
import { useReducer, useCallback, useRef } from 'react'
import { detectFileType, reductionPct, formatBytes } from '../lib/formatBytes.js'
import { compressPDF } from '../lib/compressPDF.js'
// Phase 3: import { compressImage }    from '../lib/compressImage.js'
// Phase 4: import { compressDocument } from '../lib/compressDocument.js'

// ─── Reducer ─────────────────────────────────────────────────────────────────

const INITIAL = {
    phase: 'idle',        // 'idle' | 'processing' | 'done' | 'error'
    progress: 0,          // 0–100 overall
    currentFile: '',      // name of file being processed right now
    logMessage: '',       // last progress message string
    results: [],          // final result objects
    error: null,          // Error if phase === 'error'
}

function reducer(state, action) {
    switch (action.type) {
        case 'START':
            return { ...INITIAL, phase: 'processing', currentFile: action.payload }
        case 'PROGRESS':
            return {
                ...state,
                progress: Math.min(100, Math.max(0, action.payload.pct ?? state.progress)),
                currentFile: action.payload.file ?? state.currentFile,
                logMessage: action.payload.message ?? state.logMessage,
            }
        case 'DONE':
            return { ...state, phase: 'done', progress: 100, results: action.payload }
        case 'ERROR':
            return { ...state, phase: 'error', error: action.payload, progress: 0 }
        case 'RESET':
            return INITIAL
        default:
            return state
    }
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCompression() {
    const [state, dispatch] = useReducer(reducer, INITIAL)
    const cancelRef = useRef(false)

    // ─── Main compress function ─────────────────────────────────────────────
    const compress = useCallback(async (files, settings) => {
        if (!files || files.length === 0) return

        cancelRef.current = false
        dispatch({ type: 'START', payload: files[0].name })

        const {
            quality = 65,
            mode = 'smart',
            targetBytes = null,
            outputFormat = 'same',
            grayscale = false,
            preserveMeta = false,
            password = '',
        } = settings

        const results = []

        for (let i = 0; i < files.length; i++) {
            // ── Cancellation check ─────────────────────────────────────────────
            if (cancelRef.current) break

            const file = files[i]
            const fileType = detectFileType(file)

            // Overall progress baseline for this file's portion of the total work
            const fileBase = (i / files.length) * 100
            const fileShare = (1 / files.length) * 100

            // Per-file progress callback — maps 0-100 into the file's slice of total
            const onProgress = (filePct, message) => {
                if (cancelRef.current) return
                const overall = fileBase + (filePct / 100) * fileShare
                dispatch({
                    type: 'PROGRESS',
                    payload: { pct: overall, file: file.name, message },
                })
            }

            // ── Switch on file type ────────────────────────────────────────────
            try {
                let result

                if (fileType === 'pdf') {
                    result = await compressPDF(file, {
                        quality,
                        grayscale,
                        targetBytes: targetBytes ?? resolveTargetBytes(mode, file.size),
                        password,
                        preserveMeta,
                        onProgress,
                    })

                } else if (fileType === 'image') {
                    // Phase 3 — not yet implemented
                    result = {
                        blob: file,
                        originalSize: file.size,
                        compressedSize: file.size,
                        reduction: 0,
                        didNotCompress: true,
                        warning: 'Image compression coming in Phase 3.',
                    }
                    onProgress(100, '→ Image compression not yet available')

                } else if (fileType === 'document') {
                    // Phase 4 — not yet implemented
                    result = {
                        blob: file,
                        originalSize: file.size,
                        compressedSize: file.size,
                        reduction: 0,
                        didNotCompress: true,
                        warning: 'Document compression coming in Phase 4.',
                    }
                    onProgress(100, '→ Document compression not yet available')

                } else {
                    throw new Error(`Unsupported file type for "${file.name}". Supported: PDF, JPG, PNG, WEBP, GIF, DOCX, PPTX, XLSX.`)
                }

                results.push({
                    ...result,
                    id: crypto.randomUUID(),
                    name: file.name,
                    type: fileType,
                })

            } catch (err) {
                // Per-file error — push an error result and continue with remaining files
                const friendlyMessage = humanizeError(err, file.name)
                results.push({
                    id: crypto.randomUUID(),
                    name: file.name,
                    type: fileType,
                    error: friendlyMessage,
                    originalSize: file.size,
                    compressedSize: file.size,
                    reduction: 0,
                })
                dispatch({ type: 'PROGRESS', payload: { pct: fileBase + fileShare, file: file.name, message: `⚠ ${friendlyMessage}` } })
            }
        }

        if (cancelRef.current) {
            dispatch({ type: 'RESET' })
            return
        }

        dispatch({ type: 'DONE', payload: results })
    }, [])

    // ─── Cancel ────────────────────────────────────────────────────────────
    const cancel = useCallback(() => {
        cancelRef.current = true
        dispatch({ type: 'RESET' })
    }, [])

    // ─── Reset ─────────────────────────────────────────────────────────────
    const reset = useCallback(() => {
        cancelRef.current = false
        dispatch({ type: 'RESET' })
    }, [])

    return { ...state, compress, cancel, reset }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Resolve a target byte size from Smart/Maximum mode.
 * Manual mode: returns null (no target, use quality slider directly).
 */
function resolveTargetBytes(mode, fileSize) {
    if (mode === 'maximum') return Math.floor(fileSize * 0.3)   // aim for 70% reduction
    if (mode === 'smart') return Math.floor(fileSize * 0.6)   // aim for 40% reduction
    return null  // 'manual' mode — no target, quality slider rules
}

/**
 * Convert a raw Error into a human-readable string for result cards.
 */
function humanizeError(err, filename) {
    const msg = err?.message || String(err)

    if (msg === 'PASSWORD_PROTECTED')
        return 'This PDF is password-protected. Enter the password and try again.'

    if (msg.includes('Failed to parse PDF'))
        return 'This PDF appears to be corrupted. Try re-saving it from the original app.'

    if (msg.includes('Unsupported file type'))
        return msg

    if (msg.includes('fetch') || msg.includes('network') || msg.toLowerCase().includes('cors'))
        return 'Network error while processing. Check your connection.'

    return `Could not compress "${filename}": ${msg}`
}
