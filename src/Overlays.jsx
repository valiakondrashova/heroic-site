import { useEffect, useState } from 'react'
import { Link } from './nav.jsx'

const COOKIE_KEY = 'heroic-cookies'

function BootView({ progress }) {
  return (
    <div className="boot" role="status" aria-live="polite" aria-label="Loading">
      <div className="boot-mark">
        <img src="/assets/boot-ring.svg" alt="" />
        <span className="boot-count">{progress}</span>
      </div>
    </div>
  )
}

export function BootScreen({ hold = false }) {
  const [on, setOn] = useState(true)
  const [progress, setProgress] = useState(0)
  const [holdProgress, setHoldProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    let hideTimer = 0
    let value = 0
    const started = performance.now()
    let loaded = document.readyState === 'complete'
    const onLoad = () => {
      loaded = true
    }
    window.addEventListener('load', onLoad)

    const tick = (now) => {
      const resources = performance.getEntriesByType('resource')
      const finished = resources.filter((entry) => entry.responseEnd > 0).length
      const ratio = resources.length ? finished / resources.length : 0
      const elapsed = now - started
      const timed = Math.min(92, (elapsed / 900) * 92)
      const target = loaded && elapsed > 480 ? 100 : Math.min(92, Math.max(timed, ratio * 90))
      value += (target - value) * (loaded ? 0.22 : 0.16)
      if (loaded && elapsed > 480 && 100 - value < 0.8) value = 100
      const shown = Math.min(100, Math.round(value))
      setProgress((prev) => (prev === shown ? prev : shown))
      if (shown >= 100 && loaded && elapsed > 480) {
        hideTimer = window.setTimeout(() => setOn(false), 160)
        return
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(hideTimer)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  useEffect(() => {
    if (!hold) return undefined
    let value = 0
    let frame = 0
    const tick = () => {
      value = value >= 100 ? 0 : value + 0.55
      setHoldProgress(Math.round(value))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [hold])

  if (hold) return <BootView progress={holdProgress} />
  if (!on) return null
  return <BootView progress={progress} />
}

export function CookieBanner({ force = false }) {
  const [choice, setChoice] = useState(() => {
    if (force) return null
    try {
      return localStorage.getItem(COOKIE_KEY)
    } catch {
      return 'dismissed'
    }
  })

  useEffect(() => {
    if (force) setChoice(null)
  }, [force])

  if (choice) return null

  function choose(value) {
    try {
      localStorage.setItem(COOKIE_KEY, value)
    } catch {
      /* private mode */
    }
    setChoice(value)
  }

  return (
    <aside className="cookie-bar" role="dialog" aria-labelledby="cookie-title">
      <p id="cookie-title">We use cookies!</p>
      <p>
        Cookies keep the site working and tell us which pages get used. Read the{' '}
        <Link href="/privacy">privacy policy</Link> or the <Link href="/cookies">cookie policy</Link>.
      </p>
      <div className="cookie-bar-actions">
        <button type="button" onClick={() => choose('all')}>
          Accept all
        </button>
        <button type="button" onClick={() => choose('necessary')}>
          Accept necessary
        </button>
      </div>
    </aside>
  )
}
