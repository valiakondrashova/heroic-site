import { useCallback, useRef } from 'react'
import { Link, navigate } from './nav.jsx'
import { ReelFrame } from './Reel.jsx'

const TITLE = 'Start your journey with Heroic'
const LABEL = 'get in touch'

function Arrow({ size = 20 }) {
  const h = Math.round((size * 14) / 18)
  return (
    <svg width={size} height={h} viewBox="0 0 18 14" fill="none" aria-hidden>
      <path
        d="M1 7H17M17 7L11 1M17 7L11 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CtaVariantFive() {
  const ref = useRef(null)

  const onMove = useCallback((e) => {
    const node = ref.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    node.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    node.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <section className="cta cta5">
      <a
        className="cta5-link"
        href="/contact"
        ref={ref}
        onMouseMove={onMove}
        onClick={(e) => {
          e.preventDefault()
          navigate('/contact')
        }}
      >
        <span className="cta5-stack">
          <span className="cta5-title cta5-title--dim">{TITLE}</span>
          <span className="cta5-title cta5-title--lit" aria-hidden>
            {TITLE}
          </span>
        </span>
        <span className="cta5-foot">
          <span className="cta5-label">{LABEL}</span>
          <Arrow size={18} />
        </span>
      </a>
    </section>
  )
}

function Mark({ className, label = false }) {
  return (
    <span className={className}>
      <span className="site-logo-mark">
        <img src="/assets/logo1.svg" alt={label ? 'Heroic' : ''} />
      </span>
      <span className="site-logo-tag">
        <img src="/assets/logo2.svg" alt="" />
      </span>
    </span>
  )
}

export function CtaRing() {
  return (
    <section className="cta-ring" aria-label="Start your journey with Heroic">
      <Link className="cta-ring-side" href="/contact">
        Let’s talk
      </Link>
      <div className="cta-ring-mark">
        <div className="ring-shot" aria-hidden="true">
          <img src="/assets/menu-reel.jpg" alt="" />
        </div>
        <div className="cta-ring-copy">
          <p>
            Start your
            <br />
            journey with
          </p>
          <Mark className="site-logo site-logo--cta" label />
        </div>
      </div>
      <Link className="cta-ring-side" href="/contact">
        Get in touch
      </Link>
    </section>
  )
}

export function CtaLandscape() {
  return (
    <section className="cta-land" aria-hidden="true">
      <ReelFrame className="cta-land-bg" title="Heroic showreel" clipSeconds={12} />
    </section>
  )
}
