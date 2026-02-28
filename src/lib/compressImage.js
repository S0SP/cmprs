/**
 * compressImage.js
 * Phase 3 implementation target.
 *
 * Dependencies: browser-image-compression, gifenc, omggif
 *
 * Handles all image types:
 *   JPG / PNG / WebP  → browser-image-compression (WASM WebWorker)
 *   GIF               → gifenc + omggif (frame-by-frame re-encode)
 *   SVG               → minify XML string (strip comments + whitespace)
 *   TIFF              → draw to canvas → export as JPEG
 *
 * Stub exported so imports don't break in Phase 1. Will throw if called.
 */

// ─── STUB — implement in Phase 3 ───────────────────────────────────────────

/**
 * Compress an image file client-side.
 *
 * @param {File} file                          Original image File object
 * @param {Object} [options]
 * @param {number} [options.quality=65]        1–100
 * @param {string} [options.outputFormat]      'same' | 'webp' | 'jpg' | 'png'
 * @param {number} [options.maxWidthOrHeight]  Resize constraint in pixels
 * @param {boolean} [options.preserveMeta]     Keep EXIF data (where possible)
 * @param {boolean} [options.skipFrames]       GIF only — drop every other frame
 * @param {Function} [options.onProgress]      (pct: 0-100, message: string) => void
 *
 * @returns {Promise<{
 *   blob: Blob,
 *   originalSize: number,
 *   compressedSize: number,
 *   previewUrl: string,        object URL of compressed blob for before/after slider
 *   originalPreviewUrl: string, object URL of original file for before/after slider
 *   didNotCompress?: boolean,
 *   warning?: string,          human-readable warning (e.g. GIF frame count notice)
 * }>}
 */
export async function compressImage(file, options = {}) {
    throw new Error(
        '[compressImage] Not yet implemented — see IMPLEMENTATION_PLAN.md Phase 3'
    )
}

/**
 * GIF-specific compression via gifenc + omggif.
 * Called internally by compressImage when file.type === 'image/gif'.
 *
 * @param {File} file
 * @param {Object} [options]
 * @param {number} [options.quality=65]
 * @param {boolean} [options.skipFrames=false]
 * @param {Function} [options.onProgress]
 * @returns {Promise<{ blob: Blob, originalSize: number, compressedSize: number, previewUrl: string }>}
 */
export async function compressGIF(file, options = {}) {
    throw new Error(
        '[compressGIF] Not yet implemented — see IMPLEMENTATION_PLAN.md Phase 3 §3.2a'
    )
}
