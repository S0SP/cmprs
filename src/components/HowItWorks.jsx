import React from 'react'
import './HowItWorks.css'

const STEPS = [
    {
        num: '01',
        title: 'DROP YOUR FILE',
        body: 'No signup. No limits. Upload PDF, images, or documents up to 100MB each.',
    },
    {
        num: '02',
        title: 'SET YOUR TARGET',
        body: 'Control compression level or target a specific file size. Smart mode auto-optimizes.',
    },
    {
        num: '03',
        title: 'DOWNLOAD INSTANTLY',
        body: 'Your compressed file ready in under 3 seconds. Zero storage. Files auto-delete in 2 hours.',
    },
]

export default function HowItWorks() {
    return (
        <section className="how-section" id="how-it-works" aria-labelledby="how-eyebrow">
            <div className="how-inner container">
                <div className="section-header">
                    <p className="section-eyebrow" id="how-eyebrow">HOW IT WORKS</p>
                    <div className="section-rule" aria-hidden="true" />
                </div>

                <div className="steps-grid">
                    {STEPS.map((step, i) => (
                        <div key={i} className="step-col">
                            <div className="step-num" aria-hidden="true">{step.num}</div>
                            <div className="step-rule" aria-hidden="true">━━━━━━━━━━━━━━━━━━━</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-body">{step.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
