import React from 'react'

// SVG noise filter injected once into the DOM
export default function NoiseFilter() {
    return (
        <svg
            style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
            aria-hidden="true"
        >
            <defs>
                <filter id="noise" x="0%" y="0%" width="100%" height="100%">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.65"
                        numOctaves="3"
                        stitchTiles="stitch"
                        result="noiseOut"
                    />
                    <feColorMatrix type="saturate" values="0" in="noiseOut" result="grey" />
                    <feBlend in="SourceGraphic" in2="grey" mode="overlay" result="blend" />
                    <feComposite in="blend" in2="SourceGraphic" operator="in" />
                </filter>
            </defs>
        </svg>
    )
}
