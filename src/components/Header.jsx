import React from 'react'
import './Header.css'

export default function Header() {
    return (
        <header className="site-header">
            <div className="header-inner container">
                <a href="/" className="logo" aria-label="CMPRS. home">
                    <span className="logo-text">CMPRS</span>
                    <span className="logo-slashes">//</span>
                </a>

                <nav className="header-center" aria-label="File types">
                    <span className="nav-type">PDF</span>
                    <span className="nav-sep">·</span>
                    <span className="nav-type">IMAGE</span>
                    <span className="nav-sep">·</span>
                    <span className="nav-type">DOC</span>
                </nav>

                <nav className="header-right" aria-label="Site navigation">
                    <a href="#" className="nav-link">API</a>
                    <a href="#" className="nav-link">Pricing</a>
                    <a href="#" className="nav-link">Sign In</a>
                </nav>
            </div>
        </header>
    )
}
