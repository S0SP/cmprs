/**
 * useCountdown.js
 * Phase 13 implementation target — standalone, can be done any time.
 *
 * Accurate countdown timer based on real epoch end-time.
 * Avoids drift from setInterval by recalculating remaining time each tick.
 */
import { useState, useEffect, useRef } from 'react'

/**
 * useCountdown(durationSeconds)
 *
 * Returns a formatted "HH:MM:SS" string that counts down from durationSeconds to 0.
 * The endpoint is anchored to Date.now() at first render — drift-proof.
 *
 * @param {number} durationSeconds   Total countdown duration in seconds (e.g. 7200 = 2 hrs)
 * @returns {string}                 e.g. "01:58:42"
 *
 * @example
 *   const countdown = useCountdown(7200)
 *   // → "01:59:59", "01:59:58", ..., "00:00:00"
 */
export function useCountdown(durationSeconds) {
    // Anchor the end time to mount time (stable across re-renders)
    const endTimeRef = useRef(Date.now() + durationSeconds * 1000)
    const [remaining, setRemaining] = useState(durationSeconds)

    useEffect(() => {
        const tick = () => {
            const secs = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000))
            setRemaining(secs)
        }

        tick() // immediate first tick
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, []) // runs once — endTimeRef doesn't change

    const hh = String(Math.floor(remaining / 3600)).padStart(2, '0')
    const mm = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0')
    const ss = String(remaining % 60).padStart(2, '0')

    return `${hh}:${mm}:${ss}`
}
