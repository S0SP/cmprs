import React, { useState } from 'react'
import './FAQ.css'

const FAQ_ITEMS = [
    {
        q: 'Is my file processed on your server?',
        a: 'For most operations, your file is processed entirely in your browser using WebAssembly — it never leaves your device. For complex document types like DOCX/PPTX, server-side processing is used, but files are automatically deleted within 2 hours. We do not read, analyze, or store file contents.',
    },
    {
        q: "What's the maximum file size?",
        a: 'Up to 100MB per file, no account needed. Files over 50MB require a free account (takes 10 seconds to create). Batch mode supports up to 50 images at once.',
    },
    {
        q: 'How does Target Size mode work?',
        a: 'Set an exact target (e.g. 200KB) and the system iterates through compression passes — adjusting quality, DPI, and encoding — until the output meets your target. If the target is physically impossible, we get as close as possible and tell you exactly why.',
    },
    {
        q: 'Does image compression affect visible quality?',
        a: 'At balanced settings (65%), quality loss is imperceptible for photos and documents viewed on screen. The before/after comparison slider lets you judge for yourself before downloading. Maximum compression is lossy — suitable for thumbnails or archival, not print production.',
    },
    {
        q: 'Do you have an API?',
        a: 'Yes. REST API with JWT authentication, 5,000 calls/day on Pro plan. Documentation at cmprs.io/api. The API supports all file types, target-size mode, and async webhooks for large batches.',
    },
    {
        q: "Why is this free? What's the catch?",
        a: "No catch. The core tool is free forever. Pro tier ($7/mo) unlocks 500MB file sizes, API access, and priority processing. We don't sell your data and we don't need to — the tool runs mostly client-side.",
    },
]

export default function FAQ() {
    const [open, setOpen] = useState(null)

    const toggle = (i) => setOpen(open === i ? null : i)

    return (
        <section className="faq-section" id="faq" aria-labelledby="faq-eyebrow">
            <div className="faq-inner container">
                <div className="section-header">
                    <p className="section-eyebrow" id="faq-eyebrow">FAQ</p>
                    <div className="section-rule" aria-hidden="true" />
                </div>

                <div className="faq-list">
                    {FAQ_ITEMS.map((item, i) => (
                        <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
                            <button
                                className="faq-q"
                                aria-expanded={open === i}
                                aria-controls={`faq-a-${i}`}
                                id={`faq-btn-${i}`}
                                onClick={() => toggle(i)}
                            >
                                <span>{item.q}</span>
                                <span className="faq-icon" aria-hidden="true">{open === i ? '−' : '+'}</span>
                            </button>
                            <div
                                id={`faq-a-${i}`}
                                role="region"
                                aria-labelledby={`faq-btn-${i}`}
                                className="faq-a"
                                style={{ display: open === i ? 'block' : 'none' }}
                            >
                                <p>{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
