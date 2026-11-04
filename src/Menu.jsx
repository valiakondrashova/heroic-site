import { useEffect, useState } from 'react'
import { navigate } from './nav.jsx'
import { MenuOriginal } from './MenuVariants.jsx'

export default function Menu({ open, onClose }) {
  const [hoverReady, setHoverReady] = useState(false)

  useEffect(() => {
    if (!open) {
      setHoverReady(false)
      return
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    const onMove = () => setHoverReady(true)
    window.addEventListener('keydown', onKey)
    const arm = window.setTimeout(() => {
      window.addEventListener('pointermove', onMove, { once: true })
    }, 200)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(arm)
      window.removeEventListener('pointermove', onMove)
    }
  }, [open, onClose])

  const go = (href) => (e) => {
    e.preventDefault()
    onClose()
    if (href === '/' || href === '#top') {
      navigate('/')
      return
    }
    if (href.startsWith('/')) {
      navigate(href)
      return
    }
    if (href === '#contact') {
      navigate('/')
      window.setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
      }, 50)
      return
    }
    const id = href.replace('#', '')
    if (window.location.protocol === 'file:' || window.location.pathname !== '/') navigate('/')
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  return (
    <div className={`menu${open ? ' menu--open' : ''}${hoverReady ? ' menu--hover' : ''}`} aria-hidden={!open}>
      <div className="menu-inner">
        <MenuOriginal go={go} />
      </div>
    </div>
  )
}
