import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home',      path: '/' },
  { label: 'Catalogue', path: '/catalogue' },
  { label: 'Pricing',   path: '/pricing' },
  { label: 'About',     path: '/about' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const location = useLocation()
  const drawerRef = useRef(null)

  const isActive = (path) => location.pathname === path

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Trap focus + close on Escape for accessibility
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
      <div className="section-container h-full flex items-center justify-between">

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="Nexroythm home"
          onClick={() => setMobileOpen(false)}
        >
          <img
            src="/logo.png"
            alt="Nexroythm"
            style={{ height: '32px', width: 'auto', borderRadius: '6px', objectFit: 'cover' }}
            loading="eager"
            decoding="async"
          />
          <span style={{
            fontSize: '1rem',
            fontWeight: 600,
            letterSpacing: '-0.03em',
            color: '#111111',
          }}>
            Nexroythm
          </span>
        </Link>


        {/* ── Desktop nav links (centered) ── */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`link-ghost px-4 py-1.5 ${isActive(link.path) ? 'nav-link-active' : ''}`}
              style={{ fontSize: '0.875rem' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden md:block">
          <Link to="/about#contact" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.8125rem' }}>
            Get in Touch
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className={`hamburger md:hidden ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-drawer"
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        style={{
          maxHeight: mobileOpen ? '320px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          background: 'rgba(250,250,250,0.97)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(229,231,235,0.5)',
        }}
        aria-hidden={!mobileOpen}
      >
        <div className="section-container py-5 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`link-ghost py-2.5 ${isActive(link.path) ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb', marginTop: '0.25rem' }}>
            <Link
              to="/about#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary"
              style={{ width: '100%', padding: '12px 24px', fontSize: '0.875rem' }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
