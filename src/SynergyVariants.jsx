import { ReelFrame } from './Reel.jsx'

const LABEL = 'About ROOM 8 GROUP SYNERGY'

const HEADING =
  'Beyond trailer production: 360-degree game development capacities from Room 8 Group'

const BODY =
  "Room 8 Group is an end-to-end strategic partner in external game development, providing creative and technical expertise across game development, technology, art, trailers, and QA for AAA and AA games. For 15 years, we've built award-winning partnerships with world-leading publishers."

const items = ['Game Development', 'Technology', 'Art', 'QA']

function Plus() {
  return (
    <span className="synv1-plus">+</span>
  )
}

function ArrowRight() {
  return (
    <svg className="synv1-arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 12V13H13V12V11H3V12ZM22 12L12 6.2265V17.7735L22 12Z" fill="currentColor" />
    </svg>
  )
}

function BrandCard({ className = '' }) {
  return (
    <div className={`syn-brand ${className}`}>
      <div className="syn-brand-bg">
        <ReelFrame fit="height" title="" start={15} end={16} />
      </div>
      <img className="syn-brand-logo" src="/assets/r8g-logo.svg" alt="Room 8 Group" />
      <p className="syn-brand-text">{BODY}</p>
    </div>
  )
}

function SynergyList() {
  return (
    <div className="synv1-list">
      {items.map((label) => (
        <a
          key={label}
          className="synv1-row"
          href="#"
          aria-label={`${label} — opens Room 8 Group page`}
          onClick={(event) => event.preventDefault()}
        >
          <span className="synv1-head">
            <span className="synv1-mark">
              <Plus />
              <ArrowRight />
            </span>
            <p className="synv1-title">{label}</p>
          </span>
          <span className="synv1-line" />
        </a>
      ))}
    </div>
  )
}

export function SynergyVariantOne() {
  return (
    <section className="section synv">
      <div className="synv-inner">
        <p className="section-label">{LABEL}</p>
        <p className="synergy-heading">{HEADING}</p>

        <div className="synv1-content">
          <BrandCard />
          <SynergyList />
        </div>
      </div>
    </section>
  )
}
