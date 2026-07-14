import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── Inline icons ── */
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const CrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const ChevronDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const PLANS = [
  { title: 'Starter Website',    price: '₹1,000',       features: ['1-page responsive site', 'Custom colors & theme', 'Mobile-optimized', '2-day delivery'],           popular: false },
  { title: 'Growth Website',     price: '₹5,000',       features: ['Up to 5 pages', 'Custom animations', 'Contact forms & SEO', '5-day delivery'],                    popular: true },
  { title: 'Pro Website',        price: '₹10,000',      features: ['Up to 10 pages', 'CMS integration', 'Speed-optimized (A+)', '7-day delivery'],                    popular: false },
  { title: 'Digital Gift Site',  price: 'From ₹1,000',  features: ['Interactive greeting', 'Music integration', 'Photo carousel', 'Shareable link'],                   popular: false },
  { title: 'Personal Dashboard', price: 'Custom',       features: ['Real-time charts', 'Dark/light mode', 'API integration', 'Responsive'],                            popular: false },
  { title: 'How to Code',        price: '₹15,000',      features: ['HTML/CSS/JS mastery', 'Project-based', 'Lifetime access', 'Certificate'],                         popular: false },
  { title: 'Website Building',   price: '₹15,000',      features: ['Domain & hosting', 'Responsive coding', 'Deployment', 'Monetization'],                             popular: false },
  { title: 'UI/UX Design',       price: 'Custom',       features: ['Figma prototyping', 'User flow mapping', 'Design systems', 'Dev handoff'],                         popular: false },
  { title: 'Digital Gifts',      price: 'Custom',       features: ['Animated e-cards', 'Custom calendars', 'Printable artwork', '24hr delivery'],                     popular: false },
]

const COMPARISONS = [
  { feature: 'Price',         freelancer: '₹3,000+ for basic',     agency: '₹25,000+ for basic',  nexroythm: 'Starts at ₹1,000' },
  { feature: 'Customization', freelancer: 'Template edits only',   agency: 'Rigid templates',       nexroythm: 'Fully custom code' },
  { feature: 'Delivery',      freelancer: '1–2 weeks',             agency: '3–6 weeks',             nexroythm: '2–7 days' },
  { feature: 'Ownership',     freelancer: 'No code access',        agency: 'Hidden charges',        nexroythm: 'Full source code' },
  { feature: 'Revisions',     freelancer: '1–2 only',              agency: 'Expensive rounds',      nexroythm: 'Unlimited' },
  { feature: 'Support',       freelancer: 'Ghosted after payment', agency: 'Slow ticket system',    nexroythm: 'Lifetime support' },
  { feature: 'Extras',        freelancer: 'None',                  agency: 'Charged separately',    nexroythm: 'Free SEO & optimization' },
  { feature: 'Learning',      freelancer: 'You learn nothing',     agency: 'You learn nothing',     nexroythm: 'We teach you to edit' },
]

const FAQS = [
  { q: 'Is ₹1,000 really enough?',           a: "Yes. It's a clean, single-page, fully responsive site. Perfect for portfolios, personal branding, or small businesses." },
  { q: 'Do I get the source code?',          a: 'Absolutely. You own everything we build.' },
  { q: "What if I don't know what I want?",  a: 'We offer free 15-minute consultation calls to help you decide.' },
  { q: 'Are the courses beginner-friendly?', a: '100%. We assume zero knowledge and build you up with real projects.' },
]

const SectionLabel = ({ children }) => (
  <span className="font-mono-accent" style={{ display: 'block', marginBottom: '0.75rem' }}>{children}</span>
)

export default function Pricing() {
  const navigate  = useNavigate()
  const [openFaq, setOpenFaq] = useState(null)

  const handleOrder = (plan) => {
    let budget = 'custom'
    if (plan.price.includes('1,000') && !plan.price.includes('From')) budget = '1k-5k'
    else if (plan.price.includes('5,000')) budget = '1k-5k'
    else if (plan.price.includes('10,000') || plan.price.includes('15,000')) budget = '10k+'

    navigate('/about', {
      state: {
        budget,
        message: `Hi Nexroythm, I'd like to get started with the "${plan.title}" package (${plan.price}).`,
      },
    })
  }

  return (
    <div style={{ background: '#fafafa' }}>

      {/* Header */}
      <section style={{ padding: '8rem 0 4rem', borderBottom: '1px solid #e5e7eb' }}>
        <div className="section-container reveal" style={{ textAlign: 'center' }}>
          <SectionLabel>/ pricing</SectionLabel>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '1rem' }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{ maxWidth: '400px', margin: '0 auto' }}>
            No hidden fees. No surprises. Pick a plan and let's build.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section style={{ padding: '6rem 0' }}>
        <div className="section-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.5rem',
          }}
            className="sm:grid-cols-2 lg:grid-cols-3"
          >
            {PLANS.map((plan, idx) => (
              <div
                key={plan.title}
                className="reveal card"
                style={{
                  padding: '2rem',
                  animationDelay: `${(idx % 3) * 0.1}s`,
                  position: 'relative',
                  outline: plan.popular ? '2px solid #00d4ff' : 'none',
                }}
              >
                {plan.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #00d4ff 0%, #ff00a0 100%)',
                    color: '#ffffff',
                    fontSize: '0.6875rem',
                    fontWeight: 500,
                    padding: '4px 12px',
                    borderRadius: '100px',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.03em',
                  }}>
                    Most Popular
                  </span>
                )}

                <h3 style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '0.5rem', color: '#111111' }}>
                  {plan.title}
                </h3>

                <p style={{
                  fontSize: '1.875rem',
                  fontWeight: 600,
                  letterSpacing: '-0.04em',
                  color: '#111111',
                  margin: '0.75rem 0 1.25rem',
                  lineHeight: 1,
                }}>
                  {plan.price}
                </p>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem' }}>
                  {plan.features.map((feat) => (
                    <li key={feat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
                      <CheckIcon />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleOrder(plan)}
                  style={{
                    width: '100%',
                    padding: '12px 24px',
                    borderRadius: '100px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: plan.popular ? 'none' : '1px solid #e5e7eb',
                    background: plan.popular
                      ? 'linear-gradient(135deg, #00d4ff 0%, #ff00a0 100%)'
                      : '#ffffff',
                    color: plan.popular ? '#ffffff' : '#374151',
                  }}
                  onMouseEnter={(e) => {
                    if (!plan.popular) e.currentTarget.style.background = '#f3f4f6'
                    else {
                      e.currentTarget.style.transform = 'scale(1.02)'
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.25)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.popular) e.currentTarget.style.background = '#ffffff'
                    else {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }
                  }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid #e5e7eb' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel>/ comparison</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '0.75rem' }}>
              Why Pay More for Less?
            </h2>
            <p>See how we compare to freelancers and agencies.</p>
          </div>

          {/* Desktop table */}
          <div className="reveal hidden lg:block" style={{ border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb' }}>
                  {['Feature', 'Freelancers', 'Agencies', 'Nexroythm'].map((h, i) => (
                    <th key={h} style={{
                      padding: '1rem',
                      textAlign: 'left',
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: i === 3 ? '#00a8cc' : i === 0 ? '#111111' : '#9ca3af',
                      borderBottom: '1px solid #e5e7eb',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISONS.map((row, idx) => (
                  <tr key={row.feature} style={{ background: idx % 2 === 1 ? '#f9fafb' : '#ffffff' }}>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', fontWeight: 500, color: '#111111' }}>
                      {row.feature}
                    </td>
                    {[row.freelancer, row.agency].map((val, ci) => (
                      <td key={ci} style={{ padding: '0.875rem 1rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                          <CrossIcon />{val}
                        </span>
                      </td>
                    ))}
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#059669' }}>
                        <CheckIcon />{row.nexroythm}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {COMPARISONS.map((row) => (
              <div key={row.feature} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.25rem', background: '#ffffff' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111111', marginBottom: '0.75rem' }}>{row.feature}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#9ca3af' }}>
                    <CrossIcon /><strong>Freelancers:</strong> {row.freelancer}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#9ca3af' }}>
                    <CrossIcon /><strong>Agencies:</strong> {row.agency}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#059669' }}>
                    <CheckIcon /><strong>Nexroythm:</strong> {row.nexroythm}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Closing statement */}
          <div className="reveal" style={{
            marginTop: '2.5rem',
            padding: '2.5rem',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            background: '#ffffff',
            textAlign: 'center',
          }}>
            <p style={{ fontSize: '1.0625rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#111111', maxWidth: '600px', margin: '0 auto' }}>
              We don't just deliver a product. We deliver power, speed, and knowledge — at a fraction of the market cost.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid #e5e7eb' }}>
        <div className="section-container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SectionLabel>/ faq</SectionLabel>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>Frequently Asked</h2>
          </div>

          <div className="reveal" style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FAQS.map((faq, idx) => (
              <div key={idx} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', background: '#ffffff' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1.25rem 1.5rem',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    fontFamily: 'Inter, sans-serif',
                    color: '#111111',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    letterSpacing: '-0.01em',
                  }}
                  aria-expanded={openFaq === idx}
                >
                  <span>{faq.q}</span>
                  <span style={{
                    color: '#9ca3af',
                    transition: 'transform 0.25s ease',
                    transform: openFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                    marginLeft: '1rem',
                  }}>
                    <ChevronDown />
                  </span>
                </button>
                {openFaq === idx && (
                  <div style={{ padding: '0 1.5rem 1.25rem', fontSize: '0.9375rem', color: '#6b7280', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
