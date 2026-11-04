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
      'Editing',
      'Visual effect animation',
      'Motion design',
      'Title cards creation',
    ],
  },
  {
    slug: 'trailers-cinematics',
    title: 'Trailers & cinematics',
    image: '/assets/rect15048.jpg',
    tags: [
      'Creating assets',
      'Environment setup',
      'Postproduction editing',
      'Sound design',
      'Compositing',
      'Rigging & key-frame animation',
      'Motion capture',
      'Visual effect animation',
    ],
  },
  {
    slug: 'user-acquisition-videos',
    title: 'User acquisition videos',
    image: '/assets/rect15052.jpg',
    tags: [
      '2D Motion graphics creation & animation',
      'Localization',
      'Gameplay capture',
      'Resizing',
      'In-game assets adaptation for trailers (2D/3D/animation/VFXs)',
      'Fake gameplay creation',
    ],
  },
]

function LinkArrow() {
  return (
    <svg width="11" height="10" viewBox="0 0 11 10" fill="none" aria-hidden="true">
      <path d="M1.18462 10L0 8.92308L8.12308 1.53846H0.846154V0H11V9.23077H9.30769V2.61538L1.18462 10Z" fill="currentColor" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M1 5H13M13 5L9 1M13 5L9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ServicesFilm() {
  return (
    <section className="section svv">
      <div className="svv-inner">
        <p className="section-label">Our services</p>
        <div className="svo-list">
          {services.map((svc) => (
            <Link
              key={svc.slug}
              className="svo-row svo-row--film"
              href={`/services/${svc.slug}`}
            >
              <p className="svo-title">{svc.title}</p>
              <div className="svo-side">
                <p className="svo-flow">
                  {svc.tags.map((tag, index) => (
                    <span key={tag}>
                      {index > 0 && <i aria-hidden="true" />}
                      {tag}
                    </span>
                  ))}
                </p>
                <span className="svo-more">
                  Learn more
                  <ArrowRight />
                </span>
              </div>
            </Link>
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
                  <LinkArrow />
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
                <ArrowRight />
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
                  <ArrowRight />
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
