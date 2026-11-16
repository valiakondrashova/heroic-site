import { useEffect, useRef, useState } from 'react'
import { jobs } from './CareersVariants.jsx'
import { Link } from './nav.jsx'
import { ReelFrame } from './Reel.jsx'

export const TITLE = 'Documentation Support Specialist'

export const LEAD =
  'Room 8 Group is an international art production and game dev outsourcing company, uniting the leaders of the industry: Room 8 Studio, Dragons Lake, Solid Bash, Massive Black and PUGA. We are proud to work with 7/10 of the top global publishers, including Activision, Nintendo, Ubisoft, Gameloft, EA, Xbox Game Studios, and many others. Currently, Room 8 Group is a hub of opportunities for 1000+ people, and this number continues growing every day.'

export const INTRO =
  'We are looking for new talent to join our Administrative Department to fill the Documentation Support Specialist position who is ready to help us deal with document management and control the processes of purchasing equipment in the company.'

const superpowers = [
  'Ability to search and analyze information;',
  'Ability to work at a high pace and in multitasking conditions;',
  'Ability to make quick decisions, independence, resistance to stress;',
  'Sociability, high responsibility;',
  'Ability to work in a team;',
  'Knowledge of business ethics;',
  'Competent oral and written language;',
  'Good analytical skills;',
  'Attention to detail;',
  'Organizational abilities.',
]

const duties = [
  'Apply for payment through the internal systems of the company;',
  'Check primary accounting documents and agreements;',
  'Collect primary documentation, control its’ availability signing and reporting in the Financial Department;',
  'Manage team expenses;',
  'Lead the entire process from arrival, issue and transfer of equipment;',
]

export const sections = [
  { title: 'The next great challenge is coming:', body: INTRO },
  { title: 'Superpowers you have:', items: superpowers },
  { title: 'You’re a rockstar if you have:', items: duties },
  { title: 'Becoming part of our team, you will:', items: duties },
  { title: 'Join the team and get even more:', items: duties },
]

export const facts = [
  { label: 'Work mode', value: 'Remote' },
  {
    label: 'Locations',
    value:
      'Albania, Argentina, Armenia, Brazil, Bulgaria, Croatia, Cyprus, Czech Republic, Estonia, Georgia, Great Britain, Greece, Italy, Latvia, Lithuania, Moldova, Poland, Portugal, Romania, Serbia, Slovakia, Slovenia, Turkey, Ukraine, United Kingdom',
  },
  { label: 'Languages', value: 'English - Intermediate' },
  { label: 'Team', value: 'Management & Administrative' },
]

export const related = [
  'Environment Concept Artist Senior (Hard Surface/Weapon design)',
  'Unity Developer',
  '3D Environment Team Lead (Stylized)',
]

function RelatedLabel({ title }) {
  const splitAt = title.indexOf(' (')
  if (splitAt < 28) return title
  return (
    <>
      {title.slice(0, splitAt)}
      <br />
      {title.slice(splitAt + 1)}
    </>
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

export function VacancyDescVariantOne() {
  return (
    <section className="vcv vcv1">
      <div className="vcv1-cols">
        <div className="vcv1-main">
          <h1 className="vcv-title">{TITLE}</h1>
          <p className="vcv-lead">{LEAD}</p>

          {sections.slice(0, -1).map((s) => (
            <div key={s.title} className="vcv1-block">
              <h2>{s.title}</h2>
              {s.body && <p className="vcv1-body">{s.body}</p>}
              {s.items && (
                <ul className="vcv1-list">
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <aside className="vcv1-side">
          <div className="vcv1-card">
            <h2 className="vcv1-card-title">Role summary</h2>
            <dl>
              {facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <a className="vcv-apply" href="#apply">
              Apply
              <ArrowRight />
            </a>
          </div>
        </aside>
      </div>

      <div className="vcv1-join">
        <div className="vcv1-block">
          <h2>{sections.at(-1).title}</h2>
          <ul className="vcv1-list">
            {sections.at(-1).items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <aside className="vcv1-related">
          <h2>Related openings</h2>
          {related.map((title) => (
            <Link key={title} href="/careers/documentation-support-specialist">
              <p>
                <RelatedLabel title={title} />
              </p>
              <ArrowRight />
            </Link>
          ))}
        </aside>
      </div>
    </section>
  )
}

const MORE_JOBS = jobs.slice(0, 3)

export function MoreOpportunities() {
  return (
    <section className="more-opps" aria-labelledby="more-opps-title">
      <h2 id="more-opps-title">More opportunities at Room 8 Group</h2>
      <div className="more-opps-grid">
        {MORE_JOBS.map((job) => (
          <Link key={job.id} className="more-opps-card" href="/careers/documentation-support-specialist">
            <img className="more-opps-logo" src="/assets/r8g-logo.svg" alt="" />
            <p className="more-opps-title">{job.title}</p>
            <p className="more-opps-meta">
              <span className="glyph" style={{ '--glyph': "url('/assets/icon-remote.svg')" }} />
              {job.mode}
            </p>
            <p className="more-opps-meta">
              <span className="glyph" style={{ '--glyph': "url('/assets/icon-pin.svg')" }} />
              {job.location}
            </p>
            <span className="more-opps-more">
              <span className="more-opps-more-hit">
                See more details
                <ArrowRight />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

const CONSENT_ONE =
  'By ticking this box, I am giving consent to process my personal data provided in the form above and receive marketing communications in accordance with Room 8 Group’s Privacy Policy and Cookies Policy'
const CONSENT_TWO = 'I consent to receiving marketing communications from Heroic. I can unsubscribe at any moment.'

function useConsents() {
  return useState([true, true])
}

function UploadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M10 14V4m0 0L6 8m4-4l4 4M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TextField({ label, multiline, ...props }) {
  const ref = useRef(null)
  const [filled, setFilled] = useState(false)
  const sync = (el) => setFilled(Boolean(el && el.value.length > 0))

  useEffect(() => {
    sync(ref.current)
  }, [])

  const control = {
    ...props,
    ref,
    placeholder: label,
    onInput: (e) => sync(e.currentTarget),
    onChange: (e) => sync(e.currentTarget),
    onAnimationStart: (e) => {
      if (e.animationName === 'apv-autofill') sync(e.currentTarget)
    },
  }

  return (
    <label className={`apv1-field${filled ? ' is-filled' : ''}`}>
      <span>{label}</span>
      {multiline ? <textarea {...control} /> : <input {...control} />}
    </label>
  )
}

export function ApplyFormVariantOne({
  title = 'Apply',
  id,
  heading: Heading = 'h2',
  backdrop = true,
  lede = true,
  clipStart,
  clipEnd,
  fields = 'apply',
}) {
  const [checks, setChecks] = useConsents()
  const [file, setFile] = useState('')

  return (
    <section className="apv apv-apply" id={id}>
      <div className="apv-apply-grid">
        <div className={`apv-apply-panel${backdrop ? '' : ' apv-apply-panel--plain'}`}>
          {backdrop && clipStart != null ? (
            <ReelFrame fit="height" title="" start={clipStart} end={clipEnd} />
          ) : null}
          <div className="apv-apply-copy">
            <Heading>{title}</Heading>
            {lede ? <p>Together we will bring games to the next level. Exactly with you.</p> : null}
          </div>
          <div className="apv-apply-marks" aria-hidden="true">
            <img src="/assets/mark-ring.png" alt="" />
          </div>
        </div>

        <form className="apv-apply-form" onSubmit={(e) => e.preventDefault()}>
          {fields === 'contact' ? (
            <>
              <label className="apv-line">
                <span>Company</span>
                <input type="text" name="company" autoComplete="organization" placeholder="Company" required />
              </label>
              <label className="apv-line">
                <span>Business email</span>
                <input type="email" name="email" autoComplete="email" placeholder="Business email" required />
              </label>
              <label className="apv-line apv-line--message">
                <span>Message</span>
                <textarea name="message" rows={3} placeholder="Message" />
              </label>
            </>
          ) : (
            <>
              <label className="apv-line">
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" placeholder="Name" required />
              </label>
              <label className="apv-line">
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" placeholder="Email" required />
              </label>
              <label className="apv-line">
                <span>Portfolio link</span>
                <input type="url" name="portfolio" autoComplete="url" placeholder="Portfolio link" />
              </label>
              <label className="apv-dropzone">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0]?.name || '')}
                />
                <span>{file || 'Upload or drag & drop files (5mb, pdf only)'}</span>
              </label>
              <label className="apv-line apv-line--message">
                <span>Message</span>
                <textarea name="message" rows={2} placeholder="Message" />
              </label>
            </>
          )}
          <div className="apv1-consents">
            {[CONSENT_ONE, CONSENT_TWO].map((text, i) => (
              <label key={text} className="apv-check">
                <input
                  type="checkbox"
                  checked={checks[i]}
                  onChange={() => setChecks((v) => v.map((c, j) => (i === j ? !c : c)))}
                />
                <span>{text}</span>
              </label>
            ))}
          </div>
          <button className="apv-submit apv-submit--wide" type="submit">
            Submit
            <ArrowRight />
          </button>
        </form>
      </div>
    </section>
  )
}
