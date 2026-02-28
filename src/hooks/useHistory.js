/**
 * useHistory.js
 * Phase 8 implementation target.
 *
 * React hook wrapping the history.js LocalStorage utilities.
 * Provides reactive history state and save/clear actions.
 */
import { useState, useCallback } from 'react'
import { readHistory, clearHistory } from '../lib/history.js'

/**
 * useHistory()
 *
 * @returns {{
 *   history: Array,           last 10 session entries from LocalStorage
 *   save: (results) => void,  persist a new session entry
 *   clear: () => void,        wipe all history
 * }}
 */
export function useHistory() {
    // Initialise from LocalStorage on first render
    const [history, setHistory] = useState(() => readHistory())

    const save = useCallback((results) => {
        // ─── Stub — implement in Phase 8 ──────────────────────────────────
        // Will call saveSession(results) from history.js,
        // then setHistory(updated)
        console.warn('[useHistory.save] Not yet implemented — Phase 8')
    }, [])

    const clear = useCallback(() => {
        clearHistory()
        setHistory([])
    }, [])

    return { history, save, clear }
}
