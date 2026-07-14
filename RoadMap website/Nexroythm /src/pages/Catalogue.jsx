import React, { useState, useRef, useEffect } from 'react'

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#9ca3af' }}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const PRODUCTS = [
  {
    id: 1,
    title: 'Pra-Calendar',
    url: 'https://pracalendar.netlify.app/',
    description: 'An organic, fresh green-themed digital planner with day locking, daily goals, drag-and-drop tasks, expense trackers, and diary inputs.',
    category: 'Dashboard',
    tags: ['React', 'LocalStorage', 'CSS Glassmorphism']
  },
  {
    id: 2,
    title: 'Pro Land Analytics',
    url: 'https://prdipland.netlify.app/',
    description: 'A premium analytics dashboard tracking business metrics, daily transaction logs, air tax rates, and active user counters in real-time.',
    category: 'Dashboard',
    tags: ['React', 'Charts', 'Data Aggregations']
  },
  {
    id: 3,
    title: 'Personal Portfolio',
    url: 'https://prradeepp.netlify.app/',
    description: 'A beautiful personal portfolio website with smooth custom scrolling, interactive grids, micro-animations, and project galleries.',
    category: 'Portfolio',
    tags: ['GSAP', 'Lenis Scroll', 'Responsive']
  },
  {
    id: 4,
    title: 'Trip Planner (TripKaPlaneer)',
    url: 'https://tripkaplaneer.netlify.app/',
    description: 'A lifestyle app for organizing trips, drafting detailed itineraries, logging flight info, and tracking packing checklists.',
    category: 'Lifestyle',
    tags: ['React Router', 'Budgeting', 'Checklists']
  },
  {
    id: 5,
    title: 'Habit Tracker',
    url: 'https://habittrracker.netlify.app/',
    description: 'Track daily habits, visualize streak heatmaps, and log self-improvement challenges to maintain consistency.',
    category: 'Lifestyle',
    tags: ['LocalStorage', 'Heatmaps', 'Analytics']
  },
  {
    id: 6,
    title: 'Wedding Card Invitation',
    url: 'https://weddingsp.netlify.app/',
    description: 'A gorgeous, animated digital wedding card with custom background music, animations, map locations, and RSVP collection.',
    category: 'Lifestyle',
    tags: ['Celebrations', 'Music Player', 'RSVP Forms']
  },
  {
    id: 7,
    title: 'Creative Agency Portal',
    url: 'https://studiodemo.netlify.app/',
    description: 'A clean business landing page showcasing product design packages, pricing structures, and dynamic client testimony cards.',
    category: 'Websites',
    tags: ['Tailwind CSS', 'SaaS', 'Framer Motion']
  },
  {
    id: 8,
    title: 'E-Commerce Mint',
    url: 'https://ecommercedemo.netlify.app/',
    description: 'A conversion-optimized online store layout with flyout shopping carts, search index filters, and fluid checkout screens.',
    category: 'Websites',
    tags: ['E-Commerce', 'Cart State', 'Optimized']
  }
]

const CATEGORIES = ['All', 'Portfolio', 'Dashboard', 'Websites', 'Lifestyle']

/* ── Interactive macOS style Product Card Preview ── */
function ProductCard({ product }) {
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const [interactable, setInteractable] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={containerRef}
      className="reveal"
      style={{
        background: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.06)'
        e.currentTarget.style.transform = 'translateY(-6px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.02)'
        e.currentTarget.style.transform = 'translateY(0)'
        setInteractable(false)
      }}
    >
      {/* macOS Style Window Header Bar */}
      <div style={{
        background: '#f3f4f6',
        padding: '0.6rem 1rem',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }}></span>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }}></span>
        </div>
        <div style={{
          fontSize: '0.7rem',
          color: '#9ca3af',
          fontFamily: 'monospace',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '50%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {product.url.replace('https://', '')}
        </div>
        <div style={{ width: '30px' }}></div>
      </div>

      {/* Preview Container — 16:10 aspect ratio */}
      <div style={{ position: 'relative', aspectRatio: '16/10', background: '#f9fafb', overflow: 'hidden' }}>
        {/* Skeleton shimmer while loading */}
        {!loaded && (
          <div className="skeleton" style={{ position: 'absolute', inset: 0, zIndex: 1 }} />
        )}

        {/* Translucent overlay mask to prevent scrolling hijacking */}
        {!interactable && (
          <div
            onClick={() => setInteractable(true)}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              background: 'rgba(255, 255, 255, 0.01)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.03)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.01)'}
          >
            <div style={{
              background: 'rgba(17, 17, 17, 0.85)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '30px',
              fontSize: '0.75rem',
              fontWeight: 500,
              backdropFilter: 'blur(10px)',
              pointerEvents: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              opacity: 0,
              transition: 'opacity 0.25s'
            }}
              className="interact-badge"
            >
              Click to Interact 🖱️
            </div>
            {/* Show badge on hover */}
            <style>{`
              article:hover .interact-badge { opacity: 1; }
            `}</style>
          </div>
        )}

        {/* Only render iframe once visible */}
        {visible && (
          <iframe
            title={product.title}
            src={product.url}
            sandbox="allow-scripts allow-same-origin allow-forms"
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              pointerEvents: interactable ? 'auto' : 'none',
              transition: 'transform 0.3s ease',
            }}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>

      {/* Info Details */}
      <div style={{ padding: '1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{
            display: 'inline-block',
            background: '#eef2ff',
            color: '#4f46e5',
            fontSize: '0.6875rem',
            fontWeight: 650,
            padding: '4px 12px',
            borderRadius: '100px',
            letterSpacing: '0.03em',
            textTransform: 'uppercase'
          }}>
            {product.category}
          </span>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            {product.tags.map((t) => (
              <span key={t} style={{ fontSize: '0.65rem', color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: '4px' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.5rem', color: '#111111' }}>
          {product.title}
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.6, marginBottom: '1.25rem', minHeight: '66px' }}>
          {product.description}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '1rem' }}>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', fontWeight: 600 }}
          >
            Visit Live Project
            <ExternalIcon />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Catalogue() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category.toLowerCase() === activeCategory.toLowerCase()
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh' }}>

      {/* Elegant Header Banner */}
      <section style={{ padding: '8rem 0 4rem', background: 'radial-gradient(ellipse at top, rgba(93, 156, 89, 0.05) 0%, transparent 80%)' }}>
        <div className="section-container reveal" style={{ textAlign: 'center' }}>
          <span className="font-mono-accent" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--accent-green)', fontWeight: 600 }}>
            / nexroythm-showcase
          </span>
          <h1 style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', marginBottom: '1.25rem', color: '#111111' }}>
            Our Digital Catalog
          </h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1rem', color: '#4b5563', lineHeight: 1.6 }}>
            Every product is custom-coded from scratch. Explore our active portfolios, dashboards, bespoke websites, and lifestyle projects.
          </p>
        </div>
      </section>

      {/* Filter and Search Controls */}
      <div style={{ position: 'sticky', top: '72px', zIndex: 40, background: 'rgba(250, 250, 250, 0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 0' }}>
        <div className="section-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Category Switcher */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  border: activeCategory === cat ? 'none' : '1px solid #e5e7eb',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' // premium green gradient
                    : '#ffffff',
                  color: activeCategory === cat ? '#ffffff' : '#4b5563',
                  boxShadow: activeCategory === cat ? '0 4px 14px rgba(16, 185, 129, 0.25)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = '#10b981'
                    e.currentTarget.style.color = '#10b981'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat) {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                    e.currentTarget.style.color = '#4b5563'
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div style={{ maxWidth: '480px', width: '100%', margin: '0 auto', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
              <SearchIcon />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search custom projects..."
              style={{
                width: '100%',
                padding: '12px 1rem 12px 2.75rem',
                borderRadius: '12px',
                border: '1.5px solid #e5e7eb',
                background: '#ffffff',
                fontSize: '0.9rem',
                color: '#111111',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#10b981'
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
          </div>

        </div>
      </div>

      {/* Project Grid Display */}
      <section style={{ padding: '4rem 0 8rem' }}>
        <div className="section-container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '6rem 2rem', background: '#ffffff', borderRadius: '24px', border: '1px dashed #e5e7eb' }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>🔍</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#111111', marginBottom: '0.5rem' }}>No projects found</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', maxWidth: '360px', margin: '0 auto' }}>
                We couldn't find any projects matching "{searchQuery}" under category "{activeCategory}". Try searching something else!
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '2.5rem',
            }}
              className="md:grid-cols-2 lg:grid-cols-2"
            >
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
