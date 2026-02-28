/**
 * history.js
 * Phase 8 implementation target.
 *
 * Manages LocalStorage persistence of the last 10 compression sessions.
 * No blobs are stored (blobs evaporate on tab close) — only metadata.
 *
 * Storage key: 'cmprs_history'
 * Max entries: 10 (oldest dropped automatically)
 */

const STORAGE_KEY = 'cmprs_history'
const MAX_ENTRIES = 10

/**
 * Session entry schema:
 * {
 *   id: string (UUID),
 *   timestamp: number (epoch ms),
 *   files: Array<{
 *     name: string,
 *     originalSize: number,
 *     compressedSize: number,
 *     reduction: number,     integer 0–100
 *     type: 'pdf' | 'image' | 'document' | 'unknown',
 *   }>,
 *   totalOriginal: number,
 *   totalCompressed: number,
 *   totalSaved: number,
 *   totalReduction: number,   weighted average reduction %
 * }
 */

/**
 * Read history from LocalStorage.
 * @returns {Array}  array of session entry objects (may be empty)
 */
export function readHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
        return []
    }
}

/**
 * Save a new session to history.
 * Automatically trims to MAX_ENTRIES.
 *
 * @param {Array<{ name, originalSize, compressedSize, type }>} results
 * @returns {Array}  updated history array
 */
export function saveSession(results) {
    // ─── Stub — implement in Phase 8 ──────────────────────────────────────
    throw new Error('[saveSession] Not yet implemented — Phase 8')
}

/**
 * Clear all history from LocalStorage.
 */
export function clearHistory() {
    localStorage.removeItem(STORAGE_KEY)
}
