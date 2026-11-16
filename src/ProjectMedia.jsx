import { useState } from 'react'
import { embedSrc } from './projects.js'

export function ProjectMedia({ image, video, title, className, children }) {
  const [play, setPlay] = useState(false)
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const active = play && video && !reduce

  return (
    <div
      className={className}
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
    >
      <img src={image} alt={title || ''} />
      {active && (
        <iframe
          src={embedSrc(video)}
          title={title || ''}
          tabIndex={-1}
          allow="autoplay; fullscreen; picture-in-picture"
        />
      )}
      {children}
    </div>
  )
}
