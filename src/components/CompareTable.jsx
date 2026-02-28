import React from 'react'
import './CompareTable.css'

const FEATURES = [
    { label: 'Daily File Limit', ours: '∞ Unlimited', ilovepdf: '3–5/day', smallpdf: '2/day', pdf24: 'Unlimited', zon11: 'Unlimited' },
    { label: 'Max File Size', ours: '100MB', ilovepdf: '100MB', smallpdf: '5MB', pdf24: '100MB', zon11: '50MB' },
    { label: 'Client-Side Processing', ours: true, ilovepdf: false, smallpdf: false, pdf24: 'Desktop', zon11: false },
    { label: 'Target Size Mode', ours: true, ilovepdf: false, smallpdf: false, pdf24: false, zon11: false },
    { label: 'Image + PDF Combined', ours: true, ilovepdf: 'PDF only', smallpdf: 'PDF only', pdf24: 'PDF only', zon11: true },
    { label: 'No Registration', ours: true, ilovepdf: true, smallpdf: true, pdf24: true, zon11: true },
    { label: 'Auto File Deletion', ours: '2 hrs', ilovepdf: '1 hr', smallpdf: '1 hr', pdf24: '—', zon11: '2 hrs' },
    { label: 'Pricing', ours: 'Free', ilovepdf: '$7/mo', smallpdf: '$12/mo', pdf24: 'Free', zon11: 'Free' },
]

function Cell({ value, isOurs }) {
    const cls = `td-cell ${isOurs ? 'ours-cell' : ''}`

    if (value === true) return (
        <td className={cls}>
            <svg className="check-icon" viewBox="0 0 16 16" aria-label="Yes" role="img">
                <path d="M2 8L6 12L14 4" stroke="#E8D44D" strokeWidth="1.5" fill="none" strokeLinecap="square" />
            </svg>
        </td>
    )
    if (value === false) return (
        <td className={cls}>
            <svg className="cross-icon" viewBox="0 0 16 16" aria-label="No" role="img">
                <path d="M4 4L12 12M12 4L4 12" stroke="#4A4845" strokeWidth="1.5" fill="none" strokeLinecap="square" />
            </svg>
        </td>
    )

    const isFree = typeof value === 'string' && value.toLowerCase() === 'free'
    const isGood = isFree || value === '∞ Unlimited' || value === '100MB' || value === '2 hrs' || value === true
    const isBad = value === '2/day' || value === '5MB' || value === '$12/mo'
    const isWarn = value === '3–5/day' || value === '50MB' || value === '$7/mo' || value === 'PDF only' || value === 'Desktop'

    return (
        <td className={`${cls} ${isGood ? 'val-good' : ''} ${isBad ? 'val-bad' : ''} ${isWarn ? 'val-warn' : ''}`}>
            {value}
        </td>
    )
}

export default function CompareTable() {
    return (
        <section className="compare-section" id="comparison" aria-labelledby="compare-eyebrow">
            <div className="compare-inner container">
                <div className="section-header">
                    <p className="section-eyebrow" id="compare-eyebrow">HONEST COMPARISON</p>
                    <div className="section-rule" aria-hidden="true" />
                </div>

                <div className="table-wrapper" role="region" aria-label="Feature comparison" tabIndex={0}>
                    <table className="compare-table">
                        <caption className="sr-only">Feature comparison between CMPRS. and competitors</caption>
                        <thead>
                            <tr>
                                <th scope="col">FEATURE</th>
                                <th scope="col" className="col-ours-head">CMPRS.</th>
                                <th scope="col">iLovePDF</th>
                                <th scope="col">Smallpdf</th>
                                <th scope="col">PDF24</th>
                                <th scope="col">11zon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FEATURES.map((row, i) => (
                                <tr key={i}>
                                    <td className="feature-label">{row.label}</td>
                                    <Cell value={row.ours} isOurs={true} />
                                    <Cell value={row.ilovepdf} />
                                    <Cell value={row.smallpdf} />
                                    <Cell value={row.pdf24} />
                                    <Cell value={row.zon11} />
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
