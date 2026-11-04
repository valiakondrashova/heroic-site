import { useEffect, useState } from 'react'
import { Link, useRoute } from './nav.jsx'
import { CtaLandscape } from './CtaVariants.jsx'
import { ReelFrame } from './Reel.jsx'
import { SynergyVariantOne } from './SynergyVariants.jsx'
import { servicePages } from './services.js'

export function Logo({ className = 'site-logo', onClick }) {
  return (
    <Link className={className} href="/" onClick={onClick}>
      <span className="site-logo-mark">
        <img src="/assets/logo1.svg" alt="Heroic" />
      </span>
      <span className="site-logo-tag">
        <img src="/assets/logo2.svg" alt="" />
      </span>
    </Link>
  )
}

export function SiteHeader({ menuOpen = false, onMenu }) {
  const path = useRoute()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('.hero-screen')
      if (hero) {
        const passed = hero.getBoundingClientRect().bottom <= 0
        setScrolled(passed)
        return
      }
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [path])

  return (
    <header className={`site-header${menuOpen ? ' is-menu' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <Logo onClick={menuOpen ? onMenu : undefined} />
      <button
        className={`site-menu${menuOpen ? ' is-open' : ''}`}
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Menu'}
        aria-expanded={menuOpen}
        onClick={onMenu}
      >
        <span className="burger" aria-hidden>
          <span />
          <span />
          <span />
        </span>
      </button>
    </header>
  )
}

export function SynergySection() {
  return <SynergyVariantOne />
}

function FooterColumns() {
  const path = useRoute()
  const current = (href) => (path === href ? 'is-current' : undefined)

  return (
    <>
      <div className="footer-nav">
        <div className="footer-nav-col">
          <p className="footer-nav-label">Pages</p>
          <div className="footer-nav-links">
            <Link className={current('/')} href="/">About us</Link>
            <Link className={current('/careers')} href="/careers">Careers</Link>
            <Link className={current('/contact')} href="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-nav-col">
          <p className="footer-nav-label">Our services</p>
          <div className="footer-nav-links">
            {servicePages.map((item) => (
              <Link
                key={item.slug}
                className={current(`/services/${item.slug}`)}
                href={`/services/${item.slug}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-nav-col">
          <p className="footer-nav-label">policies</p>
          <div className="footer-nav-links">
            <Link className={current('/privacy')} href="/privacy">Privacy Policy</Link>
            <Link className={current('/cookies')} href="/cookies">Cookies Policy</Link>
          </div>
        </div>
      </div>
      <div className="footer-social">
        <a href="#facebook" aria-label="Facebook">
          <img src="/assets/facebook.svg" alt="" />
        </a>
        <a href="#vimeo" aria-label="Vimeo">
          <img src="/assets/instagram-alt.svg" alt="" />
        </a>
        <a href="#instagram" aria-label="Instagram">
          <img src="/assets/instagram.svg" alt="" />
        </a>
        <a href="#linkedin" aria-label="LinkedIn">
          <img src="/assets/linkedin.svg" alt="" />
        </a>
      </div>
      <div className="footer-legal">
        <p className="footer-copyright">© 2025 All Rights Reserved</p>
        <p className="footer-disclaimer">
          All Rights Reserved All company names, brand names, trademarks, logos, illustrations, videos and any other intellectual property (Intellectual Property) published on this website are the property of their respective owners. Any non-authorized usage of Intellectual Property is strictly prohibited and any violation will be prosecuted under the law.
        </p>
      </div>
    </>
  )
}

function BrandFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-ring">
            <div className="ring-shot" aria-hidden="true">
              <ReelFrame title="Heroic showreel" clipSeconds={12} />
            </div>
            <Logo className="site-logo site-logo--footer" />
          </div>
        </div>
        <div className="footer-right">
          <FooterColumns />
        </div>
      </div>
    </footer>
  )
}

function JourneyFooter() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-journey">
            <p>Start your journey with Heroic</p>
            <Link className="footer-touch" href="/contact">
              get in touch
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="footer-right">
          <FooterColumns />
        </div>
      </div>
    </footer>
  )
}

function ReviewLinks() {
  return (
    <nav className="review-links" aria-label="Review pages">
      <Link href="/404">404 page</Link>
      <Link href="/loading">Loading</Link>
      <Link href="/cookie-banner">Cookie banner</Link>
    </nav>
  )
}

export function SiteFooter({ variant = 'brand', cta = false }) {
  const brand = variant === 'brand'

  return (
    <div id="contact">
      {cta && <CtaLandscape />}
      {brand ? <BrandFooter /> : <JourneyFooter />}
      <ReviewLinks />
    </div>
  )
}
