import { whyChooseUs } from './services.js'

function PlayReel({ image, size, onOpen }) {
  return (
    <button
      type="button"
      className={`svc-reel svc-reel--${size}`}
      aria-label="Play video"
      onClick={() => onOpen(image)}
    >
      <img src={image} alt="" />
      <span className="svc-play" aria-hidden>
        <span className="glyph" style={{ '--glyph': "url('/assets/service-play.svg')" }} />
      </span>
    </button>
  )
}

export function ServiceWorkSelected({ service, onOpen }) {
  const stills = service.videos.slice(0, 2)

  return (
    <section className="svc-work svc-fig">
      <div className="svc-know">
        <div className="svc-know-col">
          <p className="svc-kicker">What we do</p>
          <h2 className="svc-fig-title">
            From idea
            <img src="/assets/svc-idea-arrow.svg" alt="" />
            to final frame
          </h2>
          <p className="svc-flow">
            {service.process.map((item, index) => (
              <span key={item}>
                {index > 0 && <i aria-hidden="true" />}
                {item}
              </span>
            ))}
          </p>
        </div>
        <div className="svc-know-col">
          <p className="svc-kicker">Our expertise</p>
          <ul className="vcv1-list">
            {service.expertise.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="svc-stills">
        {stills.map((image) => (
          <PlayReel key={image} image={image} size="half" onOpen={onOpen} />
        ))}
      </div>
    </section>
  )
}

export function WhyChooseUs() {
  const cards = whyChooseUs.slice(0, 4)
  const room = whyChooseUs[4]

  return (
    <section className="svc-why svc-why--fig">
      <p className="svc-kicker">Why choose us</p>
      <div className="why-fig">
        <div className="why-fig-grid">
          {cards.map((item) => (
            <article key={item.title} className="svc-why-card">
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
        <article className="why-fig-room">
          <h2>{room.title}</h2>
          <p>{room.body}</p>
          <ul>
            {['Game development', 'Technology', 'Art', 'QA'].map((item) => (
              <li key={item}>
                {item}
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                  <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </li>
            ))}
          </ul>
          <img src="/assets/r8g-logo.svg" alt="Room 8 Group" />
        </article>
      </div>
    </section>
  )
}
