import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import Pricing from './pages/Pricing'
import About from './pages/About'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const location = useLocation()
  const lenisRef = useRef(null)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Lenis + GSAP ScrollTrigger integration
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // GSAP scroll-triggered reveals — only if motion is allowed
    let scrollTriggers = []
    if (!prefersReduced) {
      const revealEls = document.querySelectorAll('.reveal')
      revealEls.forEach((el) => {
        const st = gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
        if (st.scrollTrigger) scrollTriggers.push(st.scrollTrigger)
      })
    } else {
      // Immediately show all reveal elements
      document.querySelectorAll('.reveal').forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
    }

    return () => {
      lenis.destroy()
      gsap.ticker.remove(ticker)
      scrollTriggers.forEach((st) => st.kill())
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [location.pathname])

  return (
    <div className="page-transition" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
