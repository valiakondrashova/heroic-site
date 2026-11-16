import { whyChooseUs } from './services.js'
import { ProjectMedia } from './ProjectMedia.jsx'

function PlayReel({ clip, onOpen }) {
  return (
    <button
      type="button"
      className="svc-reel svc-reel--half"
      aria-label="Play video"
      onClick={() => onOpen(clip)}
    >
      {clip.story ? (
        <span className={`story-cover story-cover--${clip.story}`}>
          <img className="story-cover-bg" src="/assets/story-bg.png" alt="" />
          <span className="story-cover-board">
            <img src={clip.image} alt="" />
          </span>
        </span>
      ) : (
        <ProjectMedia
          className="svc-reel-media"
          image={clip.image}
          video={clip.video}
          title={clip.title}
        />
      )}
      <span className="svc-play" aria-hidden>
        <span className="glyph" style={{ '--glyph': "url('/assets/service-play.svg')" }} />
      </span>
    </button>
  )
}

export function ServiceWorkSelected({ service, onOpen }) {
  const stills = service.clips.slice(0, 2)

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
        {stills.map((clip) => (
          <PlayReel key={clip.id} clip={clip} onOpen={onOpen} />
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 12V13H13V12V11H3V12ZM22 12L12 6.2265V17.7735L22 12Z" fill="currentColor" />
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
