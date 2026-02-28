import React, { useRef, useState, useEffect } from 'react'
import './Hero.css'

const ACCEPTED = '.pdf,.jpg,.jpeg,.png,.webp,.gif,.svg,.tiff,.docx,.pptx,.xlsx'

export default function Hero({ files, onFilesSelected, onRemoveFile, onUrlModalOpen }) {
    const [dragOver, setDragOver] = useState(false)
    const fileInputRef = useRef(null)
    const zoneRef = useRef(null)

    /* Staggered headline animation */
    useEffect(() => {
        const words = document.querySelectorAll('.headline-word')
        words.forEach((w, i) => {
            w.style.animationDelay = `${400 + i * 200}ms`
        })
    }, [])

    const handleDragOver = (e) => {
        e.preventDefault()
        setDragOver(true)
    }

    const handleDragLeave = (e) => {
        if (!zoneRef.current?.contains(e.relatedTarget)) {
            setDragOver(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        const dropped = Array.from(e.dataTransfer.files)
        if (dropped.length) onFilesSelected(dropped)
    }

    const handleClick = () => fileInputRef.current?.click()

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            fileInputRef.current?.click()
        }
    }

    const handleInputChange = (e) => {
        const selected = Array.from(e.target.files)
        if (selected.length) onFilesSelected(selected)
        e.target.value = ''
    }

    const formatSize = (bytes) => {
        if (bytes < 1024) return `${bytes}B`
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`
        return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
    }

    const getFileExt = (name) => name.split('.').pop().toUpperCase()

    return (
        <section className="hero-section" id="hero" aria-labelledby="hero-headline">
            <div className="hero-inner container">

                {/* Vertical label */}
                <div className="vertical-label" aria-hidden="true">COMPRESSION ENGINE v2.4</div>

                {/* Headline */}
                <div className="hero-headline" id="hero-headline" aria-label="Reduce. Compress. Deliver.">
                    <span className="headline-word">REDUCE.</span>
                    <span className="headline-word">COMPRESS.</span>
                    <span className="headline-word">DELIVER.</span>
                </div>

                {/* Drop zone */}
                <div className="upload-zone-wrapper">
                    <div
                        ref={zoneRef}
                        className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                        role="button"
                        tabIndex={0}
                        aria-label="Upload zone — drag files here or press Enter to open file picker"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={handleClick}
                        onKeyDown={handleKeyDown}
                    >
                        {/* SVG dashed border */}
                        <svg className="dashed-border" aria-hidden="true" preserveAspectRatio="none">
                            <rect className={`dash-rect ${dragOver ? 'animate' : ''}`} x="1" y="1" width="99.5%" height="99.5%" rx="0" />
                        </svg>

                        {/* Corner brackets */}
                        <span className="corner tl" aria-hidden="true" />
                        <span className="corner tr" aria-hidden="true" />
                        <span className="corner bl" aria-hidden="true" />
                        <span className="corner br" aria-hidden="true" />

                        <div className="drop-content">
                            <div className="drop-icon" aria-hidden="true">
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path d="M24 8 L24 32" stroke="#E8D44D" strokeWidth="2" strokeLinecap="square" />
                                    <path d="M14 22 L24 32 L34 22" stroke="#E8D44D" strokeWidth="2" strokeLinecap="square" />
                                    <path d="M8 38 L40 38" stroke="#7A7870" strokeWidth="1.5" strokeLinecap="square" />
                                </svg>
                            </div>
                            <p className="drop-label">
                                {dragOver ? 'DROP TO COMPRESS' : 'DRAG FILES HERE — OR CLICK'}
                            </p>
                            <p className="drop-accepts">
                                Accepts: PDF · JPG · PNG · WEBP · SVG · DOCX
                            </p>
                            <p className="drop-maxsize">Max size: 100MB per file</p>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            accept={ACCEPTED}
                            onChange={handleInputChange}
                            tabIndex={-1}
                            aria-hidden="true"
                            style={{ display: 'none' }}
                        />
                    </div>

                    {/* File chips */}
                    {files.length > 0 && (
                        <div className="file-chips" aria-label="Selected files" aria-live="polite">
                            {files.map((f, i) => (
                                <div key={i} className="file-chip">
                                    <span className="chip-ext">{getFileExt(f.name)}</span>
                                    <span className="chip-name">{f.name}</span>
                                    <span className="chip-size">{formatSize(f.size)}</span>
                                    <button
                                        className="chip-remove"
                                        onClick={(e) => { e.stopPropagation(); onRemoveFile(i) }}
                                        aria-label={`Remove ${f.name}`}
                                    >×</button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Upload action buttons */}
                    <div className="upload-actions">
                        <button className="btn-primary" onClick={handleClick} id="btn-choose">CHOOSE FILES</button>
                        <button className="btn-secondary" id="btn-drive">FROM DRIVE</button>
                        <button className="btn-secondary" id="btn-url" onClick={(e) => { e.stopPropagation(); onUrlModalOpen() }}>PASTE URL</button>
                    </div>
                </div>

                {/* Trust strip */}
                <div className="trust-strip" role="list">
                    <span role="listitem"><span className="trust-lock">🔒</span> Client-side processing</span>
                    <span className="trust-sep">·</span>
                    <span role="listitem">⏱ Auto-delete in 2hrs</span>
                    <span className="trust-sep">·</span>
                    <span role="listitem">∞ Unlimited free</span>
                    <span className="trust-sep">·</span>
                    <span role="listitem">⚡ &lt; 3 second compression</span>
                </div>
            </div>
        </section>
    )
}
