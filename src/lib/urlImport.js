/**
 * urlImport.js
 * Phase 7 implementation target.
 *
 * Fetches a remote file (PDF / image) via a public CORS proxy
 * and returns it as a File object ready to pass into the compression pipeline.
 *
 * Proxy used: corsproxy.io (free, no account, works from browser)
 * Fallback:   allorigins.win
 */

const PRIMARY_PROXY = 'https://corsproxy.io/?'
const FALLBACK_PROXY = 'https://api.allorigins.win/raw?url='

/**
 * Fetch a remote file through a CORS proxy and return it as a File.
 *
 * @param {string} rawUrl  Direct URL to a PDF, image, or document file
 * @param {Function} [onProgress]  (pct: 0-100) => void  (download progress)
 * @returns {Promise<File>}
 *
 * @throws {Error} with human-readable messages:
 *   - 'INVALID_URL'        if rawUrl is not a valid http(s) URL
 *   - 'FETCH_FAILED'       if both proxies fail
 *   - 'UNSUPPORTED_TYPE'   if content-type is not a known file type
 */
export async function fetchFileFromUrl(rawUrl, onProgress) {
    // ─── Stub — implement in Phase 7 ────────────────────────────────────────
    throw new Error(
        '[fetchFileFromUrl] Not yet implemented — see IMPLEMENTATION_PLAN.md Phase 7'
    )
}

/**
 * Validate that a string is a reachable http(s) URL.
 * @param {string} url
 * @returns {boolean}
 */
export function isValidUrl(url) {
    try {
        const u = new URL(url)
        return u.protocol === 'http:' || u.protocol === 'https:'
    } catch {
        return false
    }
}

/**
 * Guess a filename from a URL.
 * @param {string} url
 * @returns {string}
 */
export function filenameFromUrl(url) {
    try {
        const u = new URL(url)
        const parts = u.pathname.split('/')
        const raw = parts[parts.length - 1] || 'imported_file'
        return raw.split('?')[0] || 'imported_file'
    } catch {
        return 'imported_file'
    }
}
