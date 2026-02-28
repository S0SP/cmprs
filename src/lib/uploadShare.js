/**
 * uploadShare.js
 * Phase 9 implementation target.
 *
 * Uploads a compressed blob to a free anonymous file host and returns
 * a publicly shareable download URL for use in the QR code modal.
 *
 * Upload chain (tried in order):
 *   1. 0x0.st      — primary,  512MB limit, no expiry metadata, CORS ok
 *   2. transfer.sh — fallback, 10GB limit,  14-day expiry, PUT method
 *   3. tmpfiles.org — last resort, 100MB, JSON response
 */

/**
 * Upload a blob via XMLHttpRequest (for progress events) to 0x0.st.
 * Falls back to fetch-based upload to transfer.sh / tmpfiles.org if XHR fails.
 *
 * @param {Blob}     blob         Compressed file blob
 * @param {string}   filename     Original filename (e.g. "document.pdf")
 * @param {Function} [onProgress] (pct: 0–100) => void  (upload progress)
 * @returns {Promise<string>}     Publicly accessible download URL
 *
 * @throws {Error} with human messages if all services fail
 */
export function uploadWithProgress(blob, filename, onProgress) {
    // ─── Stub — implement in Phase 9 ──────────────────────────────────────
    return Promise.reject(
        new Error('[uploadWithProgress] Not yet implemented — Phase 9')
    )
}

/**
 * Try uploading to each service in the fallback chain using fetch().
 * Used as fallback if XHR to 0x0.st fails.
 *
 * @param {Blob}   blob
 * @param {string} filename
 * @returns {Promise<string>}
 */
export async function uploadForSharing(blob, filename) {
    // ─── Stub — implement in Phase 9 ──────────────────────────────────────
    throw new Error('[uploadForSharing] Not yet implemented — Phase 9')
}

/**
 * Returns true if blob is too large for any supported upload service.
 * (0x0.st limit = 512MB)
 * @param {Blob} blob
 * @returns {boolean}
 */
export function exceedsShareLimit(blob) {
    return blob.size > 512 * 1024 * 1024
}

/**
 * Returns true if the file is large enough to show a "this may take a moment" notice.
 * @param {Blob} blob
 * @returns {boolean}
 */
export function isLargeUpload(blob) {
    return blob.size > 50 * 1024 * 1024
}
