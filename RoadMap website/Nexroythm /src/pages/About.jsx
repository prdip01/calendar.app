import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

/* ── Inline icons ── */
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)
const CheckCircleIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
)
const KeyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
)
const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
)
const EyeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)
const GradCapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
)

const SUBMIT_EMAIL = 'janikdad1987@gmail.com'

const VALUES = [
  { icon: KeyIcon,      title: 'Full Ownership',       desc: 'You own every line of code we write. No vendor lock-in, no hidden fees for source files.' },
  { icon: ZapIcon,      title: 'Lightning Speed',      desc: '2–7 day delivery depending on project scope. We build fast without cutting corners.' },
  { icon: EyeIcon,      title: 'Radical Transparency', desc: 'Our pricing is public. No surprises, no scope creep charges. What you see is what you pay.' },
  { icon: GradCapIcon,  title: 'Education First',      desc: "We don't just build — we teach. Every client learns to maintain their own product." },
]

const STATS = [
  { value: '500+', label: 'Products Delivered' },
  { value: '15+',  label: 'Cities Reached' },
  { value: '100%', label: 'Custom Code' },
  { value: '∞',    label: 'Lifetime Support' },
]

/* ── Meet the Rhythm team ── */
const TEAM = [
  {
    name:   'Pradeep Kumar',
    role:   'Founder & Lead Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    bio:    'Full-stack developer specializing in React, GSAP, and premium UI/UX. Passionate about making web development accessible.',
  },
  {
    name:   'Creative Studio',
    role:   'Design & Strategy',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
    bio:    'Responsible for brand direction, visual identity, and the obsessive attention to detail that makes Nexroythm products stand out.',
  },
]

const SectionLabel = ({ children }) => (
  <span className="font-mono-accent" style={{ display: 'block', marginBottom: '0.75rem' }}>{children}</span>
)

export default function About() {
  const location    = useLocation()
  const passedState = location.state || {}

  const [form, setForm] = useState({
    name:    '',
    email:   '',
    phone:   '',
    message: passedState.message || '',
    budget:  passedState.budget  || '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)

  useEffect(() => {
    if (location.state) {
      setForm((prev) => ({
        ...prev,
        message: location.state.message || prev.message,
        budget:  location.state.budget  || prev.budget,
      }))
      const el = document.getElementById('contact')
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150)
    }
  }, [location])

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Save to localStorage immediately
    const newOrder = {
      id:      `ord-${Math.floor(100 + Math.random() * 900)}`,
      name:    form.name,
      email:   form.email,
      phone:   form.phone,
      budget:  form.budget,
      message: form.message,
      status:  'New',
      date:    new Date().toLocaleString(),
    }
    const existing = localStorage.getItem('nexroythm_orders')
      ? JSON.parse(localStorage.getItem('nexroythm_orders'))
      : []
    localStorage.setItem('nexroythm_orders', JSON.stringify([newOrder, ...existing]))

    // Background email notification
    try {
      await fetch(`https://formsubmit.co/ajax/${SUBMIT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name:     form.name,
          Email:    form.email,
          Phone:    form.phone,
          Budget:   form.budget,
          Message:  form.message,
          _subject: `New Nexroythm Lead: ${form.name}`,
        }),
      })
    } catch {
      // Silently fail — order is already saved locally
    }

    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <div style={{ background: '#fafafa' }}>

      {/* ── Hero ── */}
      <section style={{ padding: '8rem 0 4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div className="section-container reveal" style={{ textAlign: 'center' }}>
          <SectionLabel>/ about</SectionLabel>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '1rem' }}>
            About Nexroythm
          </h1>
          <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '1.0625rem' }}>
            A digital product studio on a mission to make premium web development accessible to everyone.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="section-container reveal" style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
          <SectionLabel>/ our mission</SectionLabel>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '1.5rem' }}>
            Your Vision. Our Code.{' '}
            <span className="gradient-brand-text">One Rhythm.</span>
          </h2>
          <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: '#374151' }}>
            Nexroythm was founded on a simple belief: everyone deserves a premium digital presence —
            not just those with enterprise budgets. We combine obsessive craftsmanship with
            transparent pricing to deliver custom websites, dashboards, digital gifts, and educational
            courses that punch way above their price point.
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel>/ values</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>What We Stand For</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.5rem',
          }}
            className="md:grid-cols-2"
          >
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="reveal card"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#374151',
                }}>
                  <Icon />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="section-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
          }}
            className="lg:grid-cols-4"
          >
            {STATS.map(({ value, label }, idx) => (
              <div
                key={label}
                className="reveal"
                style={{ textAlign: 'center', padding: '2rem', animationDelay: `${idx * 0.1}s` }}
              >
                <div style={{
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  fontWeight: 600,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                  color: '#111111',
                }}>
                  {value}
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Rhythm (Team) ── */}
      <section style={{ padding: '6rem 0', borderBottom: '1px solid #e5e7eb' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <SectionLabel>/ team</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>
              Meet the Rhythm
            </h2>
            <p style={{ maxWidth: '400px', margin: '0 auto' }}>
              The minds behind the obsessive craftsmanship.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.5rem',
            maxWidth: '800px',
            margin: '0 auto',
          }}
            className="md:grid-cols-2"
          >
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="reveal"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '2rem',
                  transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '100%',
                    objectFit: 'cover',
                    border: '1px solid #e5e7eb',
                    marginBottom: '1.25rem',
                  }}
                />
                <h3 style={{ fontSize: '1.0625rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#111111', marginBottom: '0.25rem' }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '0.875rem',
                  fontFamily: 'JetBrains Mono, monospace',
                }}>
                  {member.role}
                </p>
                <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: '#6b7280' }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section id="contact" style={{ padding: '6rem 0' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel>/ contact</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>
              Let's Talk
            </h2>
            <p>Have a project idea? We'll get back within 12 hours.</p>
          </div>

          <div className="reveal" style={{ maxWidth: '580px', margin: '0 auto' }}>
            {submitted ? (
              <div style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                padding: '3rem 2rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <CheckCircleIcon />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.03em', color: '#111111' }}>
                  Order Registered
                </h3>
                <p style={{ fontSize: '0.9375rem', color: '#6b7280', maxWidth: '340px' }}>
                  We've received your request and will contact you shortly via email.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                {/* Name */}
                <div>
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    className="form-input"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email + Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
                  className="sm:grid-cols-2 grid-cols-1"
                >
                  <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      id="email" name="email" type="email" required
                      value={form.email} onChange={handleChange}
                      className="form-input"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      id="phone" name="phone" type="tel" required
                      value={form.phone} onChange={handleChange}
                      className="form-input"
                      placeholder="+91 99999 99999"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label htmlFor="budget" className="form-label">Budget</label>
                  <select
                    id="budget" name="budget" required
                    value={form.budget} onChange={handleChange}
                    className="form-input"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="" disabled>Select budget range</option>
                    <option value="1k-5k">₹1,000 – ₹5,000</option>
                    <option value="5k-10k">₹5,000 – ₹10,000</option>
                    <option value="10k+">₹10,000+</option>
                    <option value="custom">Custom Quote</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message" name="message" rows={4} required
                    value={form.message} onChange={handleChange}
                    className="form-input"
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    opacity: submitting ? 0.7 : 1,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? 'Sending…' : 'Send Message'}
                  {!submitting && <SendIcon />}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}
