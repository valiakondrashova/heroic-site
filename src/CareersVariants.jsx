import { Link } from './nav.jsx'
import { heroicJobs, roomJobs } from './jobs.js'

const VACANCY = '/careers/documentation-support-specialist'
const ROOM = 'https://room8group.com/join-the-team/'

export const jobs = heroicJobs

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

function JobFacts({ job }) {
  return (
    <div className="crv-facts">
      <p className="crv-meta">
        <span className="glyph" style={{ '--glyph': "url('/assets/icon-remote.svg')" }} />
        {job.mode}
      </p>
      <p className="crv-meta crv-meta--place">
        <span className="glyph" style={{ '--glyph': "url('/assets/icon-pin.svg')" }} />
        {job.location}
      </p>
    </div>
  )
}

function MoreLink() {
  return (
    <span className="crv-more">
      <span className="crv-more-hit">
        See more details
        <ArrowRight />
      </span>
    </span>
  )
}

export function CareersVariantThree() {
  return (
    <section className="crv crv-cards">
      <div className="crv-grid">
        {jobs.slice(0, 6).map((job) => (
          <Link key={job.id} className="crv-card" href={VACANCY}>
            <JobFacts job={job} />
            <p className="crv-card-title">{job.title}</p>
            <MoreLink />
          </Link>
        ))}
      </div>
    </section>
  )
}

export function RoomOpportunities() {
  return (
    <section className="room-jobs" aria-labelledby="room-jobs-title">
      <div className="room-jobs-head">
        <p className="section-label">Looking for other roles?</p>
        <h2 id="room-jobs-title">
          At Room 8 Group, we have even more career opportunities waiting for you
        </h2>
      </div>
      <div className="room-jobs-grid">
        {roomJobs.slice(0, 3).map((job) => (
          <Link key={job.id} className="room-job" href={ROOM} target="_blank" rel="noreferrer">
            <img className="room-job-logo" src="/assets/r8g-logo.svg" alt="" />
            <p className="crv-card-title">{job.title}</p>
            <JobFacts job={job} />
            <MoreLink />
          </Link>
        ))}
      </div>
      <a className="see-jobs" href={ROOM} target="_blank" rel="noreferrer">
        <span className="crv-more-hit">
          See all jobs
          <ArrowRight />
        </span>
      </a>
    </section>
  )
}
