import { Link } from 'react-router-dom'

/* ── Inline SVG icons to avoid Lucide bundle overhead ── */
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
)

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

const PRODUCT_LINKS = [
  { label: 'Custom Websites', path: '/pricing' },
  { label: 'Digital Gifts',   path: '/pricing' },
  { label: 'Dashboards',      path: '/pricing' },
  { label: 'Masterclasses',   path: '/pricing' },
]

const COMPANY_LINKS = [
  { label: 'About Us',  path: '/about' },
  { label: 'Portfolio', path: '/catalogue' },
  { label: 'Pricing',   path: '/pricing' },
  { label: 'Contact',   path: '/about#contact' },
]

const RESOURCE_LINKS = [
  { label: 'FAQ',              path: '/pricing' },
  { label: 'Privacy Policy',   path: '#' },
  { label: 'Terms of Service', path: '#' },
]

const SOCIAL_LINKS = [
  { label: 'Instagram', icon: InstagramIcon, href: '#' },
  { label: 'LinkedIn',  icon: LinkedinIcon,  href: '#' },
  { label: 'Twitter',   icon: TwitterIcon,   href: '#' },
  { label: 'GitHub',    icon: GithubIcon,    href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="section-container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>

        {/* ── Main grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, 1fr)',
          gap: '2.5rem',
        }}
          className="sm:grid-cols-2 lg:grid-cols-4"
        >

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" className="flex items-center gap-2.5" style={{ marginBottom: '1rem', textDecoration: 'none' }}>
              <img
                src="/logo.png"
                alt="Nexroythm"
                style={{ height: '30px', width: 'auto', borderRadius: '6px', objectFit: 'cover' }}
                loading="lazy"
                decoding="async"
              />
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '-0.03em', color: '#ffffff' }}>
                Nexroythm
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Your Vision. Our Code. One Rhythm.
              <br />
              Premium digital products at prices that make sense.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
              {SOCIAL_LINKS.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="footer-icon"
                  style={{ color: '#9ca3af', display: 'flex' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ marginBottom: '1.25rem' }}>Products</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {PRODUCT_LINKS.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ marginBottom: '1.25rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {COMPANY_LINKS.map(({ label, path }) => (
                <li key={label}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 style={{ marginBottom: '1.25rem' }}>Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {RESOURCE_LINKS.map(({ label, path }) => (
                <li key={label}>
                  {path === '#'
                    ? <a href={path}>{label}</a>
                    : <Link to={path}>{label}</Link>
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="footer-bottom">
        <div className="footer-bottom section-container" style={{ paddingTop: '1.25rem', paddingBottom: '1.25rem', display: 'flex', flexWrap: 'wrap', flexDirection: 'row', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>© {new Date().getFullYear()} Nexroythm. Built with obsession.</span>
          <span>
            All products are 100% custom coded. No templates.
          </span>
        </div>
      </div>
    </footer>
  )
}
