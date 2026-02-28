import React, { useRef, useEffect } from 'react'
import './UrlModal.css'

export default function UrlModal({ onClose, onImport }) {
    const inputRef = useRef(null)
    const overlayRef = useRef(null)

    useEffect(() => {
        inputRef.current?.focus()
        const handleKey = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [onClose])

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onClose()
    }

    const handleImport = () => {
        const val = inputRef.current?.value.trim()
        if (val) onImport(val)
    }

    return (
        <div
            className="modal-overlay"
            ref={overlayRef}
            onClick={handleOverlayClick}
            aria-modal="true"
            role="dialog"
            aria-labelledby="url-modal-title"
        >
            <div className="modal">
                <h2 id="url-modal-title" className="modal-title">PASTE FILE URL</h2>
                <p className="modal-desc">Enter a direct link to a PDF or image file</p>
                <input
                    ref={inputRef}
                    type="url"
                    id="url-input"
                    className="styled-input"
                    placeholder="https://example.com/document.pdf"
                    aria-label="File URL"
                    onKeyDown={e => { if (e.key === 'Enter') handleImport() }}
                />
                <div className="modal-actions">
                    <button className="btn-primary" onClick={handleImport}>IMPORT</button>
                    <button className="btn-secondary" onClick={onClose}>CANCEL</button>
                </div>
            </div>
        </div>
    )
}
