import { useEffect, useState } from 'react'
import { CaseInfoVariantOne } from './CaseStudyVariants.jsx'
import { ProjectMedia } from './ProjectMedia.jsx'

export default function CaseStudy({ open, project, moreImage, onClose }) {
  const image = project?.image
  const extras = project?.extras || []
  const [paused, setPaused] = useState(true)

  useEffect(() => {
    if (!open) return
    setPaused(true)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <div
      className={`case-study${open ? ' case-study--open' : ''}`}
      aria-hidden={!open}
      onClick={onClose}
    >
      <div
        className="case-study-frame"
        onClick={(e) => e.stopPropagation()}
      >
      <div
        className="case-study-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Case study"
      >
        <div className="case-study-scroll">
        <div className="case-study-media">
          {image && <img src={image} alt="" />}
          <div className="case-study-controls">
            <button className="case-study-mute" type="button" aria-label="Mute">
              <span className="glyph" style={{ '--glyph': "url('/assets/control-volume.svg')" }} />
            </button>
            <button
              className="case-study-pause"
              type="button"
              onClick={() => setPaused((v) => !v)}
            >
              <span className="hero-pause-icon" aria-hidden>
                <span className="hero-pause-bar-left" />
                <span className="hero-pause-bar-right" />
              </span>
              <span className="hero-pause-text">{paused ? 'pause' : 'play'}</span>
            </button>
          </div>
        </div>

        <div className="case-study-body">
          <CaseInfoVariantOne />

          <div className="case-study-more">
            <p>More videos</p>
            <div className="case-study-more-list">
              {extras.map((extra) => (
                <ProjectMedia
                  key={extra.id}
                  className="case-study-more-thumb"
                  image={extra.image}
                  video={extra.video}
                  title={extra.title}
                />
              ))}
              {moreImage && (
                <div className="case-study-more-thumb">
                  <img src={moreImage} alt="" />
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
      <button className="case-study-close" type="button" aria-label="Close" onClick={onClose}>
        <span className="glyph" style={{ '--glyph': "url('/assets/control-close.svg')" }} />
      </button>
      </div>
    </div>
  )
}
