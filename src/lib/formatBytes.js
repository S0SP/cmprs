/**
 * formatBytes.js
 * Shared utility — converts raw byte counts to human-readable strings.
 * Used across compressPDF, compressImage, compressDocument, ResultsPanel, etc.
 */

/**
 * Format a byte count into a readable string.
 * @param {number} bytes
 * @param {number} [decimals=1]
 * @returns {string}  e.g. "1.4 MB", "389 KB", "24 B"
 */
export function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 B'
    if (!Number.isFinite(bytes) || bytes < 0) return '—'

    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1)
    const value = bytes / Math.pow(k, i)

    return `${i === 0 ? value : value.toFixed(decimals)} ${sizes[i]}`
}

/**
 * Calculate the percentage reduction between two sizes.
 * @param {number} originalBytes
 * @param {number} compressedBytes
 * @returns {number}  integer 0–100
 */
export function reductionPct(originalBytes, compressedBytes) {
    if (!originalBytes || originalBytes <= 0) return 0
    return Math.max(0, Math.round((1 - compressedBytes / originalBytes) * 100))
}

/**
 * Determine the file category from a File object.
 * @param {File} file
 * @returns {'pdf' | 'image' | 'document' | 'unknown'}
 */
export function detectFileType(file) {
    const name = file.name.toLowerCase()
    const type = (file.type || '').toLowerCase()

    if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf'

    if (
        type.startsWith('image/') ||
        ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.tiff', '.tif'].some(ext =>
            name.endsWith(ext)
        )
    )
        return 'image'

    if (
        ['.docx', '.pptx', '.xlsx', '.doc', '.ppt', '.xls'].some(ext => name.endsWith(ext))
    )
        return 'document'

    return 'unknown'
}

/**
 * Returns the file extension in uppercase without the dot.
 * @param {string} filename
 * @returns {string}  e.g. "PDF", "JPG", "DOCX"
 */
export function fileExt(filename) {
    return (filename.split('.').pop() || '').toUpperCase()
}

/**
 * Returns a MIME type guess for a filename.
 * @param {string} filename
 * @returns {string}
 */
export function guessMimeType(filename) {
    const ext = filename.split('.').pop()?.toLowerCase()
    const map = {
        pdf: 'application/pdf',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        webp: 'image/webp',
        gif: 'image/gif',
        svg: 'image/svg+xml',
        tiff: 'image/tiff',
        tif: 'image/tiff',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }
    return map[ext] || 'application/octet-stream'
}
