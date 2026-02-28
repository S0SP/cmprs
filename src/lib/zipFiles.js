/**
 * zipFiles.js
 * Phase 6 implementation target.
 *
 * Dependencies: jszip, file-saver
 *
 * Creates a ZIP archive from an array of result objects and triggers a browser download.
 */

import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { formatBytes } from './formatBytes.js'

/**
 * Download multiple compressed results as a single ZIP file.
 *
 * @param {Array<{ name: string, blob: Blob }>} results
 * @param {string} [zipName='cmprs_compressed.zip']
 * @param {Function} [onProgress]  (pct: 0-100) => void
 * @returns {Promise<void>}
 */
export async function downloadAsZip(results, zipName = 'cmprs_compressed.zip', onProgress) {
    const zip = new JSZip()
    const folder = zip.folder('compressed')

    const validResults = results.filter(r => r.blob instanceof Blob)

    if (validResults.length === 0) {
        throw new Error('No valid compressed files to zip.')
    }

    for (const r of validResults) {
        folder.file(`compressed_${r.name}`, r.blob)
    }

    const blob = await zip.generateAsync(
        {
            type: 'blob',
            compression: 'DEFLATE',
            compressionOptions: { level: 6 },
        },
        (metadata) => {
            onProgress?.(Math.round(metadata.percent))
        }
    )

    saveAs(blob, zipName)
    console.info(
        `[zipFiles] Packed ${validResults.length} file(s) → ${formatBytes(blob.size)}`
    )
}

/**
 * Trigger download of a single compressed file blob.
 *
 * @param {Blob} blob
 * @param {string} originalName  e.g. "document.pdf"
 */
export function downloadSingle(blob, originalName) {
    saveAs(blob, `compressed_${originalName}`)
}
