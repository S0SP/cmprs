import React, { useState, useEffect } from 'react'
import './ProcessingState.css'

export default function ProcessingState({ filename, progress, logMessage, onCancel }) {
    const [logLines, setLogLines] = useState([])
    const [displayPct, setDisplayPct] = useState(0)

    /* Animate percentage counter smoothly toward actual progress */
    useEffect(() => {
        let raf
        let current = displayPct
        const target = Math.round(progress)
        const step = () => {
            if (current < target) {
                current = Math.min(current + 2, target)
                setDisplayPct(current)
                raf = requestAnimationFrame(step)
            }
        }
        raf = requestAnimationFrame(step)
        return () => cancelAnimationFrame(raf)
    }, [progress])

    /* Append new log messages as they arrive from the compression hook */
    useEffect(() => {
        if (!logMessage) return
        setLogLines(prev => {
            // Avoid duplicating the same message
            if (prev[prev.length - 1] === logMessage) return prev
            return [...prev.slice(-11), logMessage]  // keep last 12 lines
        })
    }, [logMessage])

    return (
        <section className="processing-section" aria-live="polite" id="processing-state">
            <div className="processing-inner container">
                <div className="processing-header">
                    <span className="processing-status-label">PROCESSING:</span>
                    <span className="processing-filename">{filename}</span>
                </div>

                <div className="progress-container">
                    <div
                        className="progress-track"
                        role="progressbar"
                        aria-valuenow={Math.round(progress)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label="Compression progress"
                    >
                        <div
                            className="progress-fill"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="progress-shimmer" />
                        </div>
                    </div>
                    <span className="progress-pct">{displayPct}%</span>
                </div>

                <div className="processing-log" aria-label="Processing log">
                    {logLines.length === 0 && (
                        <div className="log-line log-line--idle">→ Initializing...</div>
                    )}
                    {logLines.map((line, i) => (
                        <div
                            key={`${i}-${line}`}
                            className={`log-line${i === logLines.length - 1 ? ' log-line--active' : ''}`}
                            style={{ animationDelay: `${i * 40}ms` }}
                        >
                            {line}
                        </div>
                    ))}
                </div>

                <button className="btn-cancel" onClick={onCancel}>CANCEL</button>
            </div>
        </section>
    )
}
