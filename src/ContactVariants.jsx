import { useEffect, useState } from 'react'

export const team = [
  {
    name: 'Guillaume Carmona',
    role: 'VP of Game Production',
    image: '/assets/contact-team-1.jpg',
    pos: 'center 18%',
    bio: [
      'Guillaume Carmona is a video game industry veteran with over 20 years of experience managing big marketing teams. Born and raised with video games, he spent over 18 years at UBISOFT, emphasizing autonomy and defining studio and project structure.',
      'His rich experience in various areas of game development gave him an understanding of the players, the market, society evolution, and the skills to speak a wide range of languages from business units to large-scale project management',
    ],
  },
  {
    name: 'Sandy Heslop',
    role: 'Trailers & Cinematics Division Director',
    image: '/assets/contact-team-2.jpg',
    pos: 'center 12%',
    bio: [
      'Sandy Heslop is an experienced CG specialist with a 24-year career encompassing games, film, TV, and advertising.',
      'Having started his professional journey in 2001, Sandy participated in various Hollywood franchises, such as Avengers, Fast & Furious, Godzilla, Harry Potter, Pirates of the Caribbean, X-Men, and more.',
    ],
  },
  {
    name: 'Sergey Egorov',
    role: 'Trailers & Cinematics Director',
    image: '/assets/contact-team-3.jpg',
    pos: 'center 10%',
    bio: [
      'Sergey has been a team lead at Heroic for the past three years.',
      'As an artist with diverse experience, his background in concept art, photorealistic 3D, and sound engineering helps Sergey supervise the team, production quality, and creative processes.',
    ],
  },
  {
    name: 'Sasha Polishchuk',
    role: 'Trailers & Cinematics Production Management Director',
    image: '/assets/contact-team-4.jpg',
    pos: 'center 22%',
    bio: [
      'More than 10 years of Project Management experience in different creative fields, like advertising, games, web design, and multi-platform projects. She helped to deliver more than 500+ videos during her carrier with different styles and complexity.',
    ],
  },
]

const stills = [
  '/assets/rect15048.jpg',
  '/assets/rect15049.jpg',
  '/assets/rect15051.jpg',
  '/assets/rect15052.jpg',
  '/assets/rect15053.jpg',
  '/assets/rect15054.jpg',
  '/assets/rect15055.jpg',
  '/assets/rect15056.jpg',
]

const zones = [
  { label: 'Pacific', offset: -8 },
  { label: 'Americas', offset: -5 },
  { label: 'UK', offset: 0 },
  { label: 'Central Europe', offset: 1 },
  { label: 'Eastern Europe', offset: 2 },
  { label: 'Gulf', offset: 4 },
  { label: 'Singapore', offset: 8 },
  { label: 'Tokyo', offset: 9 },
  { label: 'Sydney', offset: 10 },
]

const studios = [
  { name: 'Czech Republic', x: '54%', y: '28%' },
  { name: 'Ukraine', x: '58.5%', y: '27%' },
  { name: 'Cyprus', x: '59%', y: '36%' },
]

function hourIn(offset, now) {
  return (now.getUTCHours() + offset + 24) % 24
}

export function TeamVariantThree() {
  return (
    <section className="team-board">
      <h2>The people you’ll talk to</h2>
      <div className="team-board-grid">
        {team.map((person, index) => (
          <article key={person.name} className="team-board-card">
            <div className="team-board-head">
              <img src={person.image} alt="" style={{ objectPosition: person.pos }} />
              <div className="team-board-id">
                <p className="team-board-name">{person.name}</p>
                <p className="team-board-role">{person.role}</p>
              </div>
            </div>
            <div className="team-board-bio">
              {person.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="team-board-work">
              <p className="team-board-working">Working on</p>
              <div className="team-board-stills">
                {[0, 1, 2, 3].map((n) => (
                  <img key={n} src={stills[(index * 2 + n) % stills.length]} alt="" />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

const geoPlaces = [
  { name: 'USA', x: 22, y: 42, kind: 'lead', label: { x: 2.2, y: 5 } },
  { name: 'Canada', x: 34, y: 32, kind: 'lead' },
  { name: 'Canada', x: 37.5, y: 36, kind: 'prod', label: { x: 2, y: 1 } },
  { name: 'Brazil', x: 38, y: 72, kind: 'prod', label: { x: 2, y: 1 } },
  { name: 'UK', x: 58, y: 34, kind: 'lead', label: { x: -4.5, y: -1 } },
  { name: 'Spain', x: 56, y: 42, kind: 'prod', label: { x: -6, y: 2, anchor: 'end' } },
  { name: 'Poland', x: 64, y: 32, kind: 'prod', label: { x: 1.6, y: -2 } },
  { name: 'Ukraine', x: 68, y: 36, kind: 'prod', label: { x: 1.8, y: 0.5 } },
  { name: 'Romania', x: 64, y: 40, kind: 'prod', label: { x: -1, y: 4 } },
  { name: 'Cyprus', x: 66, y: 48, kind: 'prod', label: { x: 1.8, y: 1 } },
]

const geoHours = Array.from({ length: 15 }, (_, index) => {
  const offset = index - 9
  const clock = 12 + offset
  return {
    offset,
    time: `${clock}:00`,
    zone: offset > 0 ? `+${offset}` : `${offset}`,
    on: [-8, -5, -3, 0, 1, 2].includes(offset),
  }
})

export function TimeZones() {
  return (
    <section className="geo" aria-label="Global Expertise">
      <h2 className="section-label">Global Expertise</h2>
      <div className="geo-map">
        <img src="/assets/global-map.svg" alt="" />
        <div className="geo-meridians" aria-hidden="true" />
        {geoPlaces.map((place) => (
          <span
            key={`${place.name}-${place.kind}-${place.x}`}
            className={`geo-pin geo-pin--${place.kind}`}
            style={{ left: `${place.x}%`, top: `${place.y}%` }}
          >
            {place.label && (
              <span
                className="geo-pin-name"
                style={{
                  left: `${place.label.x}em`,
                  top: `${place.label.y}em`,
                  textAlign: place.label.anchor === 'end' ? 'right' : 'left',
                }}
              >
                {place.name}
              </span>
            )}
          </span>
        ))}
        <ul className="geo-legend">
          <li><i className="geo-swatch geo-swatch--prod" /> Production</li>
          <li><i className="geo-swatch geo-swatch--lead" /> Leadership and key production roles</li>
        </ul>
        <ol className="geo-hours">
          {geoHours.map((hour) => (
            <li key={hour.offset} className={hour.on ? 'is-on' : undefined}>
              <span>{hour.time}</span>
              <strong>{hour.zone}</strong>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function GlobeBlock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const awake = zones.filter((zone) => {
    const hour = hourIn(zone.offset, now)
    return hour >= 9 && hour < 19
  })

  return (
    <section className="globe-block">
      <div className="globe-copy">
        <h2>Where we are, right now</h2>
        <p>
          The globe turns with the day. Purple is a Heroic desk. The line under it is whoever is in working hours at this minute.
        </p>
        <p className="globe-now">
          On the floor now
          <strong>{awake.map((zone) => zone.label).join(' · ') || 'The night shift is holding the clock'}</strong>
        </p>
        <ul className="globe-studios">
          {studios.map((studio) => (
            <li key={studio.name}>{studio.name}</li>
          ))}
        </ul>
      </div>
      <div className="globe" aria-hidden="true">
        <div className="globe-sphere">
          <div className="globe-rotor">
            <div className="globe-land" />
            <div className="globe-land" />
            {studios.map((studio) => (
              <span key={studio.name} className="globe-pin" style={{ left: `calc(${studio.x} / 2)`, top: `calc(${studio.y} + 8%)` }} />
            ))}
            {studios.map((studio) => (
              <span key={`${studio.name}-b`} className="globe-pin" style={{ left: `calc(${studio.x} / 2 + 50%)`, top: `calc(${studio.y} + 8%)` }} />
            ))}
          </div>
          <div className="globe-shade" />
        </div>
      </div>
    </section>
  )
}
