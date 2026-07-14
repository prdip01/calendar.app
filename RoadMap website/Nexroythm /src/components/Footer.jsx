import { Link } from 'react-router-dom'

/* ── Inline SVG icons to avoid Lucide bundle overhead ── */
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
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
  { label: 'Instagram', icon: InstagramIcon, href: 'https://www.instagram.com/nexroythm?utm_source=qr&igsh=dHJjdW82eWNld2dv' },
  { label: 'Twitter',   icon: TwitterIcon,   href: 'https://x.com/_nexroythm_' },
  { label: 'Facebook',  icon: FacebookIcon,  href: 'https://www.facebook.com/profile.php?id=61591588751764' },
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
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
              Your Vision. Our Code. One Rhythm.
              <br />
              Premium digital products at prices that make sense.
            </p>
            <p style={{ fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
              ✉️ <a href="mailto:nexroythm@gmail.com" style={{ color: '#9ca3af', textDecoration: 'none', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                nexroythm@gmail.com
              </a>
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
