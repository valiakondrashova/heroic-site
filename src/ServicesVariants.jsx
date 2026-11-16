import { useState } from 'react'
import { Link } from './nav.jsx'

const LABEL = 'Our services'

const services = [
  {
    slug: 'pre-production',
    title: 'Pre-production',
    image: '/assets/rect15049.jpg',
    tags: [
      'Scriptwriting',
      'Storyboarding',
      'Animatics',
      'Mood boarding',
      'Concept art',
      'Color scripts',
      'Beauty shots production',
    ],
  },
  {
    slug: 'in-game-cutscenes',
    title: 'In-game cutscenes',
    image: '/assets/rect15051.jpg',
    tags: ['Real-time cutscenes', 'In-engine integration', 'Motion capture & animation cleanup'],
  },
  {
    slug: 'gameplay-trailers',
    title: 'Gameplay trailers',
    image: '/assets/rect15056.jpg',
    tags: [
      'Capture team',
      'Sound design',
      'Visual effect animation',
      'Title cards creation',
      'Motion design',
      'Editing',
    ],
  },
  {
    slug: 'trailers-cinematics',
    title: 'Trailers & cinematics',
    image: '/assets/rect15048.jpg',
    tags: [
      'Creating assets',
      'Environment setup',
      'Visual effect animation',
      'Motion capture',
      'Compositing',
      'Postproduction editing',
      'Sound design',
      'Rigging & key-frame animation',
    ],
  },
  {
    slug: 'user-acquisition-videos',
    title: 'User acquisition videos',
    image: '/assets/rect15052.jpg',
    tags: [
      '2D Motion graphics creation & animation',
      'Localization',
      'In-game assets adaptation for trailers (2D/3D/animation/VFXs)',
      'Gameplay capture',
      'Fake gameplay creation',
      'Resizing',
    ],
  },
]

function ArrowMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12V13H13V12V11H3V12ZM22 12L12 6.2265V17.7735L22 12Z" fill="currentColor" />
    </svg>
  )
}

function ServiceFilmRow({ svc }) {
  const [spot, setSpot] = useState(null)

  return (
    <Link
      className="svo-row svo-row--film"
      href={`/services/${svc.slug}`}
      onMouseMove={(e) => setSpot({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setSpot(null)}
    >
      <p className="svo-title">
        {svc.slug === 'user-acquisition-videos' ? (
          <>
            User acquisition
            <br />
            videos
          </>
        ) : (
          svc.title
        )}
      </p>
      <div className="svo-side">
        <p className="svo-flow">
          {svc.tags.map((tag, index) => (
            <span key={tag}>
              {index > 0 && <i aria-hidden="true" />}
              {tag}
            </span>
          ))}
        </p>
      </div>
      {spot && (
        <span className="project-cursor" style={{ left: spot.x, top: spot.y }}>
          <img src="/assets/learn-more-figma.svg" alt="" />
          Learn more
        </span>
      )}
    </Link>
  )
}

export function ServicesFilm() {
  return (
    <section className="section svv">
      <div className="svv-inner">
        <p className="section-label">Our services</p>
        <div className="svo-list">
          {services.map((svc) => (
            <ServiceFilmRow key={svc.slug} svc={svc} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ServicesVariantOne({ excludeSlug, label = LABEL, titlesOnly = false }) {
  const items = excludeSlug ? services.filter((svc) => svc.slug !== excludeSlug) : services
  const index = Boolean(excludeSlug)

  if (index) {
    return (
      <section className="section svv svv--index">
        <div className="svv-inner">
          {label ? <p className="section-label">{label}</p> : null}

          {titlesOnly ? (
            <div className="svv-links">
              {items.map((svc) => (
                <Link key={svc.slug} className="svv-link" href={`/services/${svc.slug}`}>
                  {svc.title}
                  <ArrowMark />
                </Link>
              ))}
            </div>
          ) : (
          <div className="svv-index-list">
            {items.map((svc) => (
              <Link
                key={svc.slug}
                className="svv-index-row"
                href={`/services/${svc.slug}`}
              >
                <span className="svv-index-title">{svc.title}</span>
                <span className="svv-index-meta">{svc.tags.join(' · ')}</span>
                <ArrowMark />
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="section svv">
      <div className="svv-inner">
        <p className="section-label">{label}</p>

        <div className="svv1-list">
          {items.map((svc) => (
            <Link
              key={svc.slug}
              className="svv1-row"
              href={`/services/${svc.slug}`}
            >
              <div className="svv1-main">
                <p className="svv1-title">{svc.title}</p>
                <span className="svv1-cta">
                  View service
                  <ArrowMark />
                </span>
              </div>
              <ul className="svv1-tags">
                {svc.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
