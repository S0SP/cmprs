import React from 'react'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-inner container">
                <span className="footer-logo">CMPRS//</span>
                <span className="footer-sep">·</span>
                <span>2025</span>
                <span className="footer-sep">·</span>
                <a href="#" className="footer-link">Privacy Policy</a>
                <span className="footer-sep">·</span>
                <a href="#" className="footer-link">API Docs</a>
                <span className="footer-sep">·</span>
                <a href="#" className="footer-link">GitHub</a>
                <span className="footer-sep">·</span>
                <span>Made with obsession</span>
            </div>
        </footer>
    )
}
