import React, { useState } from 'react'
import './SettingsPanel.css'

const MODES = [
    { id: 'smart', label: 'SMART' },
    { id: 'manual', label: 'MANUAL' },
    { id: 'maximum', label: 'MAXIMUM' },
]

const PRESETS = [
    { id: 'email', label: 'Email ≤5MB', quality: 72 },
    { id: 'web', label: 'Web ≤1MB', quality: 55 },
    { id: 'archive', label: 'Archive', quality: 45 },
    { id: 'whatsapp', label: 'WhatsApp', quality: 68 },
]

function estimateSize(quality) {
    const mb = 14 * (quality / 100) * 0.9 + 0.3
    const pct = Math.round(100 - quality * 0.88)
    return { size: mb > 1 ? `${mb.toFixed(1)}MB` : `${Math.round(mb * 1024)}KB`, pct }
}

export default function SettingsPanel({
    mode, onModeChange,
    quality, onQualityChange,
    targetSize, onTargetSizeChange,
    outputFormat, onOutputFormatChange,
    onCompress, hasFiles
}) {
    const [customKB, setCustomKB] = useState('')
    const [showCustomKB, setShowCustomKB] = useState(false)
    const [activePreset, setActivePreset] = useState(null)
    const [grayscale, setGrayscale] = useState(false)
    const [preserveMeta, setPreserveMeta] = useState(true)

    const { size, pct } = estimateSize(quality)

    const handleTargetChange = (e) => {
        const val = e.target.value
        onTargetSizeChange(val)
        setShowCustomKB(val === 'custom')
    }

    const handlePreset = (preset) => {
        setActivePreset(preset.id)
        onQualityChange(preset.quality)
        onModeChange('manual')
    }

    const thumbPosition = ((quality - 1) / 99) * 100

    return (
        <section className="settings-section" id="settings-panel">
            <div className="settings-inner container">

                {/* Mode toggle */}
                <div className="settings-group">
                    <label className="settings-label">MODE</label>
                    <div className="mode-toggle" role="group" aria-label="Compression mode">
                        {MODES.map(m => (
                            <button
                                key={m.id}
                                className={`mode-btn ${mode === m.id ? 'active' : ''}`}
                                onClick={() => onModeChange(m.id)}
                                aria-pressed={mode === m.id}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Quality slider — only in manual */}
                {(mode === 'manual' || mode === 'smart') && (
                    <div className="settings-group settings-group--slider">
                        <label className="settings-label" htmlFor="quality-slider">
                            COMPRESSION LEVEL
                        </label>
                        <div className="slider-wrap">
                            <div
                                className="slider-tooltip"
                                style={{ left: `calc(${thumbPosition}% - 18px)` }}
                                aria-hidden="true"
                            >
                                {quality}%
                            </div>
                            <input
                                type="range"
                                id="quality-slider"
                                min={1}
                                max={100}
                                value={quality}
                                onChange={e => { onQualityChange(Number(e.target.value)); setActivePreset(null) }}
                                className="quality-slider"
                                style={{ '--fill': `${thumbPosition}%` }}
                                aria-label="Quality: 1 is maximum compression, 100 is maximum quality"
                            />
                        </div>
                        <div className="slider-ends">
                            <span>MAXIMUM COMPRESSION</span>
                            <span>MAXIMUM QUALITY</span>
                        </div>
                        <p className="size-estimate">
                            Estimated size: ~{size} (↓ {pct}%)
                        </p>
                    </div>
                )}

                {/* Target size */}
                <div className="settings-group">
                    <label className="settings-label" htmlFor="target-size">TARGET SIZE</label>
                    <div className="select-wrapper">
                        <select
                            id="target-size"
                            className="styled-select"
                            value={targetSize}
                            onChange={handleTargetChange}
                        >
                            <option value="100">100 KB</option>
                            <option value="200">200 KB</option>
                            <option value="500">500 KB</option>
                            <option value="1024">1 MB</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                    {showCustomKB && (
                        <div className="custom-kb-wrap">
                            <input
                                type="number"
                                id="custom-kb"
                                className="styled-input"
                                placeholder="Enter size"
                                min={1}
                                max={100000}
                                value={customKB}
                                onChange={e => setCustomKB(e.target.value)}
                                aria-label="Custom target size"
                            />
                            <span className="unit-label">KB</span>
                        </div>
                    )}
                </div>

                {/* Output format */}
                <div className="settings-group">
                    <label className="settings-label" htmlFor="output-format">OUTPUT FORMAT</label>
                    <div className="select-wrapper">
                        <select
                            id="output-format"
                            className="styled-select"
                            value={outputFormat}
                            onChange={e => onOutputFormatChange(e.target.value)}
                        >
                            <option value="same">Same as input</option>
                            <option value="webp">WebP</option>
                            <option value="jpg">JPG</option>
                            <option value="png">PNG</option>
                            <option value="pdf">PDF</option>
                        </select>
                    </div>
                </div>

                {/* Compress CTA */}
                <div className="settings-group settings-group--cta">
                    <button
                        className="btn-primary btn-compress"
                        id="btn-compress"
                        onClick={onCompress}
                        disabled={!hasFiles}
                        aria-label="Start compression"
                    >
                        COMPRESS NOW →
                    </button>
                </div>
            </div>

            {/* Options row */}
            <div className="settings-options container">
                <label className="toggle-option">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={grayscale}
                        onChange={e => setGrayscale(e.target.checked)}
                        id="opt-grayscale"
                    />
                    <span className={`toggle-track ${grayscale ? 'on' : ''}`} aria-hidden="true">
                        <span className="toggle-thumb" />
                    </span>
                    Grayscale conversion
                </label>
                <label className="toggle-option">
                    <input
                        type="checkbox"
                        className="sr-only"
                        checked={preserveMeta}
                        onChange={e => setPreserveMeta(e.target.checked)}
                        id="opt-meta"
                    />
                    <span className={`toggle-track ${preserveMeta ? 'on' : ''}`} aria-hidden="true">
                        <span className="toggle-thumb" />
                    </span>
                    Preserve metadata
                </label>
                <div className="presets-row">
                    <span className="settings-label">PRESET:</span>
                    {PRESETS.map(p => (
                        <button
                            key={p.id}
                            className={`preset-chip ${activePreset === p.id ? 'active' : ''}`}
                            onClick={() => handlePreset(p)}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
