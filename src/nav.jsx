import { useEffect, useState } from 'react'

function normalize(path) {
  if (!path || path === '/' || path === '/index.html') return '/'
  return path
}

function readPath() {
  if (window.location.protocol === 'file:') {
    const hash = window.location.hash.slice(1)
    return normalize(hash.startsWith('/') ? hash : '/')
  }
  return normalize(window.location.pathname)
}

export function navigate(to) {
  if (window.location.protocol === 'file:') {
    const path = to.startsWith('/') ? to : `/${to}`
    window.location.hash = path
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    return
  }
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function useRoute() {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onChange = () => setPath(readPath())
    window.addEventListener('popstate', onChange)
    window.addEventListener('hashchange', onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('hashchange', onChange)
    }
  }, [])

  return path
}

export function Link({ href, className, children, onClick, ...props }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        if (href.startsWith('http') || href.startsWith('mailto:')) return
        e.preventDefault()
        onClick?.(e)
        navigate(href)
      }}
      {...props}
    >
      {children}
    </a>
  )
}
