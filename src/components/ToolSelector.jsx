import React, { useRef, useEffect } from 'react'
import './ToolSelector.css'

const TABS = [
    { id: 'pdf', label: 'PDF', sublabel: 'PDF COMPRESSOR — Supported: .pdf · Max 100MB' },
    { id: 'image', label: 'IMAGE', sublabel: 'IMAGE COMPRESSOR — Supported: .jpg .png .webp .gif .svg .tiff · Max 100MB' },
    { id: 'document', label: 'DOCUMENT', sublabel: 'DOCUMENT COMPRESSOR — Supported: .docx .pptx .xlsx · Max 100MB' },
    { id: 'batch', label: 'BATCH', sublabel: 'BATCH MODE — Compress up to 50 files at once · All formats supported' },
]

export default function ToolSelector({ activeTab, onTabChange }) {
    const tabRefs = useRef({})
    const indicatorRef = useRef(null)

    useEffect(() => {
        const activeEl = tabRefs.current[activeTab]
        const indicator = indicatorRef.current
        if (activeEl && indicator) {
            indicator.style.left = `${activeEl.offsetLeft}px`
            indicator.style.width = `${activeEl.offsetWidth}px`
        }
    }, [activeTab])

    const currentSublabel = TABS.find(t => t.id === activeTab)?.sublabel || ''

    return (
        <section className="tool-selector-section" id="tool-selector">
            <div className="tool-selector-inner container">
                <div
                    className="tool-tabs"
                    role="tablist"
                    aria-label="File type selector"
                >
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            ref={el => { tabRefs.current[tab.id] = el }}
                            className={`tool-tab ${activeTab === tab.id ? 'active' : ''}`}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            id={`tab-${tab.id}`}
                            onClick={() => onTabChange(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                    <div
                        ref={indicatorRef}
                        className="tab-indicator"
                        aria-hidden="true"
                    />
                </div>
                <p className="tool-sublabel">{currentSublabel}</p>
            </div>
        </section>
    )
}
