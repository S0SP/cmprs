import React, { useState, useEffect } from 'react'
import './ResultsPanel.css'
import { useCountdown } from '../hooks/useCountdown.js'
import { formatBytes } from '../lib/formatBytes.js'

function useCountUp(target, duration = 700) {
    const [value, setValue] = useState(0)
    useEffect(() => {
        let start = null
        const step = (ts) => {
            if (!start) start = ts
            const elapsed = ts - start
            const progress = Math.min(elapsed / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(ease * target))
            if (progress < 1) requestAnimationFrame(step)
        }
        const raf = requestAnimationFrame(step)
        return () => cancelAnimationFrame(raf)
    }, [target, duration])
    return value
}

function ResultCard({ result, index }) {
    const reduction = Math.round((1 - result.compressedSize / result.originalSize) * 100)
    const animatedPct = useCountUp(reduction)
    const ext = result.name.split('.').pop().toUpperCase()

    const formatSize = (b) => formatBytes(b)

    const handleDownload = () => {
        const url = URL.createObjectURL(result.blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `compressed_${result.name}`
        a.click()
        URL.revokeObjectURL(url)
    }

    const beforePct = Math.round((result.originalSize / (result.originalSize)) * 100)
    const afterPct = Math.round((result.compressedSize / result.originalSize) * 100)

    return (
        <article
            className="result-card"
            style={{ animationDelay: `${index * 80}ms` }}
            aria-label={`Compressed file: ${result.name}`}
        >
            <div className="card-top">
                <div className="card-badge">
                    <span className="badge-ext">{ext}</span>
                </div>
                <div className="card-info">
                    <div className="card-name">{result.name}</div>
                    <div className="card-sizes">
                        <span className="size-original">{formatSize(result.originalSize)}</span>
                        <span className="size-arrow">→</span>
                        <span className="size-compressed">{formatSize(result.compressedSize)}</span>
                    </div>
                    <div className="card-after-bar">
                        <div className="before-bar" style={{ width: '100%' }} aria-hidden="true">
                            <div className="after-bar" style={{ width: `${afterPct}%` }} />
                        </div>
                        <span className="bar-label">Before / After</span>
                    </div>
                </div>
                <div className="card-reduction">
                    <span className="reduction-pct">↓ {animatedPct}%</span>
                </div>
            </div>

            <div className="card-actions">
                <button className="btn-primary card-action-btn" onClick={handleDownload}>
                    DOWNLOAD
                </button>
                <button className="btn-secondary card-action-btn">PREVIEW</button>
                <button className="btn-secondary card-action-btn">ADJUST</button>
                <button className="btn-ghost card-action-btn">REMOVE</button>
            </div>
        </article>
    )
}

export default function ResultsPanel({ results, onReset }) {
    const formatSize = (b) => formatBytes(b)
    const countdown = useCountdown(7200)  // 2-hour epoch-anchored timer

    const totalOriginal = results.reduce((s, r) => s + (r.originalSize || 0), 0)
    const totalCompressed = results.reduce((s, r) => s + (r.compressedSize || 0), 0)
    const totalSaved = totalOriginal - totalCompressed
    const totalPct = Math.round((totalSaved / Math.max(totalOriginal, 1)) * 100)

    return (
        <section className="results-section" id="results-panel">
            <div className="results-inner container">
                {/* Batch summary */}
                {results.length > 1 && (
                    <div className="batch-summary">
                        <span className="batch-stats">
                            {results.length} files processed · Total saved: {formatSize(totalSaved)} (↓ {totalPct}%)
                        </span>
                        <button className="btn-primary">DOWNLOAD ALL AS ZIP</button>
                    </div>
                )}

                {/* Results grid */}
                <div className="results-grid" role="list">
                    {results.map((r, i) => (
                        <ResultCard key={r.id} result={r} index={i} />
                    ))}
                </div>

                {/* Deletion notice */}
                <div className="deletion-notice" aria-live="polite">
                    <span className="notice-icon" aria-hidden="true">⏱</span>
                    File will be permanently deleted in{' '}
                    <span className="countdown">{countdown}</span>
                </div>

                {/* Compress more */}
                <div className="results-footer">
                    <button className="btn-secondary" onClick={onReset}>← COMPRESS MORE FILES</button>
                </div>
            </div>
        </section>
    )
}
