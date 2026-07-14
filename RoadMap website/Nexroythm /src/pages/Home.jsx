import { Link } from 'react-router-dom'

/* ── Tree-shaken inline icons ── */
const IconMessage = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
const IconTerminal = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
  </svg>
)
const IconGit = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M13 6h3a2 2 0 0 1 2 2v7" /><line x1="6" y1="9" x2="6" y2="21" />
  </svg>
)
const IconRocket = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const STEPS = [
  { step: '01', title: 'Share Your Idea',  desc: 'Tell us what you need. Free 15-minute scoping call to map the strategy.', icon: IconMessage },
  { step: '02', title: 'We Design & Build', desc: 'You relax, we create. Built from scratch with clean, custom code.',         icon: IconTerminal },
  { step: '03', title: 'Review & Revise',  desc: 'Unlimited tweaks until perfect. Full control over every visual decision.',   icon: IconGit },
  { step: '04', title: 'Launch & Own',     desc: "Your product goes live. Full source code delivered — it's yours.",           icon: IconRocket },
]

const STATS = [
  { value: '500+',     label: 'Products Delivered' },
  { value: '100%',     label: 'Custom Code' },
  { value: 'Lifetime', label: 'Support Included' },
  { value: '15+',      label: 'Cities Reached' },
]

const TESTIMONIALS = [
  {
    name:    'Rohit Sharma',
    role:    'Tech Startup Founder',
    comment: 'Nexroythm built our landing page in 4 days. Lighthouse score hit 99. Their direct support saved us from a ton of headache.',
    avatar:  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    name:    'Ananya Kapoor',
    role:    'Software Engineering Student',
    comment: 'The "How to Code" masterclass changed everything. Zero generic theory, fully project-based. It helped me land my frontend role.',
    avatar:  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
  },
  {
    name:    'Vikram Roy',
    role:    'Creative Product Designer',
    comment: 'Ordered a custom anniversary site as a gift. The animations, music player, and detail absolutely wowed my wife. Premium.',
    avatar:  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
  },
]

/* ── Helpers ── */
const SectionLabel = ({ children }) => (
  <span className="font-mono-accent" style={{ display: 'block', marginBottom: '0.75rem' }}>
    {children}
  </span>
)

const StarFilled = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

export default function Home() {
  return (
    <div style={{ background: '#fafafa' }}>

      {/* ─────────────────── HERO ─────────────────── */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        background: '#fafafa',
      }}>
        <div className="section-container w-full">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
            className="lg:grid-cols-2"
          >
            {/* Left: text */}
            <div className="reveal">
              {/* Tagline badge */}
              <div style={{
                display: 'inline-block',
                padding: '6px 14px',
                borderRadius: '100px',
                border: '1px solid #e5e7eb',
                marginBottom: '2rem',
              }}>
                <span className="font-mono-accent">
                  Your Vision. Our Code. One Rhythm.
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                fontWeight: 600,
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#111111',
                maxWidth: '800px',
                marginBottom: '1.5rem',
              }}>
                We Don't Just Build Websites.{' '}
                <span className="gradient-brand-text">We Build Digital&nbsp;Identity.</span>
              </h1>

              <p style={{
                fontSize: '1.125rem',
                color: '#6b7280',
                maxWidth: '560px',
                lineHeight: 1.6,
                marginBottom: '2.5rem',
              }}>
                Custom websites, digital gifts, dashboards &amp; courses — crafted with obsession, priced to make sense.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/catalogue" className="btn-primary">
                  Explore Products
                </Link>
                <Link to="/pricing" className="btn-secondary">
                  View Pricing
                </Link>
              </div>
            </div>

            {/* Right: hero video / mockup */}
            <div className="reveal" style={{ animationDelay: '0.12s' }}>
              <div className="hero-float" style={{ position: 'relative' }}>
                <div style={{
                  position: 'relative',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                  aspectRatio: '16/10',
                  background: '#ffffff',
                }}>
                  {/*
                    Hero video: place 'hero_video.mp4' in /public.
                    Falls back to dashboard_mockup.jpg poster.
                  */}
                  <video
                    src="/hero_video.mp4"
                    poster="/dashboard_mockup.jpg"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────── HOW IT WORKS ─────────────────── */}
      <section style={{ padding: '8rem 0', borderTop: '1px solid #e5e7eb' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel>/ our process</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1rem' }}>
              From Concept to Production
            </h2>
            <p style={{ maxWidth: '480px', margin: '0 auto' }}>
              Zero friction. Absolute transparency. Fast, quality delivery.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '2rem',
          }}
            className="sm:grid-cols-2 lg:grid-cols-4"
          >
            {STEPS.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={item.step}
                  className="reveal card"
                  style={{
                    animationDelay: `${idx * 0.12}s`,
                    position: 'relative',
                    padding: '2rem',
                  }}
                >
                  <span className="font-mono-accent" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                    {item.step}
                  </span>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#374151',
                    marginBottom: '1.25rem',
                  }}>
                    <Icon />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────── STATS ─────────────────── */}
      <section style={{ padding: '4rem 0', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
        <div className="section-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
          }}
            className="lg:grid-cols-4"
          >
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className="reveal"
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  animationDelay: `${idx * 0.1}s`,
                }}
              >
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                  color: '#111111',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', letterSpacing: '-0.01em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── TESTIMONIALS ─────────────────── */}
      <section style={{ padding: '8rem 0' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SectionLabel>/ testimonials</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1rem' }}>
              What Creators Say
            </h2>
            <p style={{ maxWidth: '440px', margin: '0 auto' }}>
              Read from startups, creators, and students who levelled up their digital presence.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '2rem',
          }}
            className="md:grid-cols-3"
          >
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={item.name}
                className="reveal card"
                style={{
                  animationDelay: `${idx * 0.12}s`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
                    {[...Array(5)].map((_, i) => <StarFilled key={i} />)}
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: '#374151', fontStyle: 'italic', lineHeight: 1.65 }}>
                    "{item.comment}"
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '100%',
                      objectFit: 'cover',
                      border: '1px solid #e5e7eb',
                    }}
                  />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#111111' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                      {item.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────── CTA STRIP ─────────────────── */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid #e5e7eb' }}>
        <div className="section-container reveal" style={{ textAlign: 'center' }}>
          <SectionLabel>/ ready to start</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', marginBottom: '1rem' }}>
            Ready to bring your vision to life?
          </h2>
          <p style={{ maxWidth: '420px', margin: '0 auto 2.5rem' }}>
            Let's build something extraordinary together.
          </p>
          <Link to="/pricing" className="btn-primary">
            View Plans &amp; Pricing
          </Link>
        </div>
      </section>

    </div>
  )
}
