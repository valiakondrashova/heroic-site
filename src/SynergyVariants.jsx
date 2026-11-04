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
    <svg className="synv1-arrow-icon" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
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

function BrandCard({ className = '' }) {
  return (
    <div className={`syn-brand ${className}`}>
      <div className="syn-brand-bg">
        <img src="/assets/synergy-bg.jpg" alt="" />
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
