/**
 * compressDocument.js
 * Phase 4 implementation target.
 *
 * Dependencies: jszip, browser-image-compression
 *
 * DOCX / PPTX / XLSX are ZIP archives. Compression strategy:
 *   1. Parse ZIP with JSZip
 *   2. Strip revision history (word/revisions/, docProps/app.xml)
 *   3. Re-compress all embedded images via browser-image-compression
 *   4. Re-pack the ZIP at DEFLATE level 9
 *
 * Stub exported so imports don't break in Phase 1. Will throw if called.
 */

// ─── STUB — implement in Phase 4 ───────────────────────────────────────────

/**
 * Compress a DOCX / PPTX / XLSX file client-side.
 *
 * @param {File} file                         Original document File object
 * @param {Object} [options]
 * @param {number} [options.imageQuality=50]  Quality for embedded image re-compression
 * @param {boolean} [options.stripRevisions]  Strip Word/PPT revision history (default: true)
 * @param {boolean} [options.stripMetadata]   Strip author/company from docProps (default: true)
 * @param {Function} [options.onProgress]     (pct: 0-100, message: string) => void
 *
 * @returns {Promise<{
 *   blob: Blob,
 *   originalSize: number,
 *   compressedSize: number,
 *   didNotCompress?: boolean,
 * }>}
 */
export async function compressDocument(file, options = {}) {
    throw new Error(
        '[compressDocument] Not yet implemented — see IMPLEMENTATION_PLAN.md Phase 4'
    )
}
