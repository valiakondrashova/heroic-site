import { useCallback, useEffect, useRef, useState } from 'react'
import { reelSrc, useReel } from './Reel.jsx'
import Menu from './Menu.jsx'
import { useRoute } from './nav.jsx'
import { SiteHeader, SiteFooter } from './SiteChrome.jsx'
import { SynergyVariantOne } from './SynergyVariants.jsx'
import { ServicesFilm } from './ServicesVariants.jsx'
import CookiesPage from './CookiesPage.jsx'
import PrivacyPage from './PrivacyPage.jsx'
import CareersPage from './CareersPage.jsx'
import VacancyPage from './VacancyPage.jsx'
import CaseStudy from './CaseStudy.jsx'
import ContactPage from './ContactPage.jsx'
import ServicePage from './ServicePage.jsx'
import NotFound from './NotFound.jsx'
import { BootScreen, CookieBanner } from './Overlays.jsx'
import { servicePages } from './services.js'

const projects = [
  { size: 'large', image: '/assets/rect15049.jpg' },
  { size: 'small', image: '/assets/rect15052.jpg' },
  { size: 'small', image: '/assets/rect15053.jpg' },
  { size: 'large', image: '/assets/rect15051.jpg' },
  { size: 'large', image: '/assets/rect15048.jpg' },
  { size: 'small', image: '/assets/rect15054.jpg' },
  { size: 'small', image: '/assets/rect15055.jpg' },
  { size: 'large', image: '/assets/rect15056.jpg' },
]

function ProjectCard({ size, image, onOpen }) {
  const [spot, setSpot] = useState(null)

  return (
    <a
      className={`project-card project-card--${size}`}
      href="#projects"
      onMouseMove={(e) => setSpot({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setSpot(null)}
      onClick={(e) => {
        e.preventDefault()
        onOpen(image)
      }}
    >
      <div className={`project-thumb project-thumb--${size}`}>
        <img src={image} alt="" loading="lazy" decoding="async" />
        <div className="project-controls">
          <img src="/assets/control-volume.svg" alt="" />
        </div>
      </div>
      <div className="project-caption">
        <p className="project-caption-title">GalaGames &quot;Superior&quot;</p>
        <p className="project-caption-sub">Gameplay Trailer</p>
      </div>
      {spot && (
        <span className="project-cursor" style={{ left: spot.x, top: spot.y }}>
          <img src="/assets/learn-more-figma.svg" alt="" />
          Learn more
        </span>
      )}
    </a>
  )
}

function ClientRow1() {
  const cells = [
    { bg: 'frame875.svg' },
    { logo: 'layer1.svg', cls: 'client-logo--gram' },
    { logo: 'layer2.svg', cls: 'client-logo--sony' },
    { logo: 'mediatonic.svg', cls: 'client-logo--mediatonic' },
    { logo: 'layer3.svg', cls: 'client-logo--foxnext' },
    { bg: 'frame880.svg' },
    { logo: 'rect268.png', cls: 'client-logo--image' },
    { logo: 'zynga.svg', cls: 'client-logo--zynga' },
    { bg: 'frame883.svg' },
  ]
  return (
    <div className="clients-row">
      {cells.map((cell, i) => (
        <div className="client-cell" key={i}>
          {cell.bg && <img className="cell-bg" src={`/assets/${cell.bg}`} alt="" />}
          {cell.logo && (
            <img className={`client-logo ${cell.cls}`} src={`/assets/${cell.logo}`} alt="" />
          )}
        </div>
      ))}
    </div>
  )
}

function ClientRow2() {
  const cells = [
    { bg: 'frame884.svg' },
    { logo: 'g30.svg', cls: 'client-logo--nacon' },
    { bg: 'frame877.svg' },
    { logo: 'rovio.svg', cls: 'client-logo--rovio' },
    { logo: 'group.svg', cls: 'client-logo--scopely' },
    { bg: 'frame878.svg' },
    { bg: 'frame878.svg' },
    { logo: 'image3442171.png', cls: 'client-logo--image' },
    { logo: 'layer4.svg', cls: 'client-logo--gala' },
  ]
  return (
    <div className="clients-row">
      {cells.map((cell, i) => (
        <div className="client-cell" key={i}>
          {cell.bg && <img className="cell-bg" src={`/assets/${cell.bg}`} alt="" />}
          {cell.logo && (
            <img className={`client-logo ${cell.cls}`} src={`/assets/${cell.logo}`} alt="" />
          )}
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const path = useRoute()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [path])

  const serviceSlug = path.startsWith('/services/') ? path.slice('/services/'.length) : ''
  const knownService = servicePages.some((service) => service.slug === serviceSlug)

  let page = <HomePage />
  if (path === '/cookies') page = <CookiesPage onMenu={() => setMenuOpen(true)} />
  else if (path === '/privacy') page = <PrivacyPage onMenu={() => setMenuOpen(true)} />
  else if (path === '/contact') page = <ContactPage onMenu={() => setMenuOpen(true)} />
  else if (path === '/loading' || path === '/cookie-banner') page = <HomePage />
  else if (serviceSlug && knownService) {
    page = <ServicePage slug={serviceSlug} onMenu={() => setMenuOpen(true)} />
  } else if (path === '/careers/documentation-support-specialist') {
    page = <VacancyPage onMenu={() => setMenuOpen(true)} />
  } else if (path === '/careers') page = <CareersPage onMenu={() => setMenuOpen(true)} />
  else if (path !== '/') page = <NotFound />

  return (
    <>
      <BootScreen hold={path === '/loading'} />
      <SiteHeader menuOpen={menuOpen} onMenu={() => setMenuOpen((open) => !open)} />
      <Menu open={menuOpen} onClose={closeMenu} />
      {page}
      <CookieBanner force={path === '/cookie-banner'} />
    </>
  )
}

function HeroScreen() {
  const iframeRef = useRef(null)
  const playerRef = useReel(iframeRef)
  const [muted, setMuted] = useState(true)
  const [paused, setPaused] = useState(false)

  const toggleMute = () => {
    const player = playerRef.current
    if (!player) return
    const next = !muted
    player.setMuted(next).then(() => setMuted(next)).catch(() => {})
  }

  const togglePause = () => {
    const player = playerRef.current
    if (!player) return
    const next = !paused
    const action = next ? player.pause() : player.play()
    action.then(() => setPaused(next)).catch(() => {})
  }

  return (
    <div className="hero-screen">
      <div className="hero-bg">
        <iframe
          ref={iframeRef}
          src={reelSrc()}
          title="Heroic showreel"
          tabIndex={-1}
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </div>
      <div className="hero-title">
        <p>We are Heroic</p>
        <p>The video production studio </p>
      </div>
      <div className="hero-controls">
        <button className="hero-mute" type="button" aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={muted} onClick={toggleMute}>
          <span className="glyph hero-controls-icon" style={{ '--glyph': "url('/assets/control-volume.svg')" }} />
        </button>
        <button className="hero-pause" type="button" aria-label={paused ? 'Play' : 'Pause'} aria-pressed={paused} onClick={togglePause}>
          <span className="hero-pause-icon" aria-hidden>
            <span className="hero-pause-bar-left" />
            <span className="hero-pause-bar-right" />
          </span>
          <span className="hero-pause-text">{paused ? 'play' : 'pause'}</span>
        </button>
      </div>
    </div>
  )
}

function HomePage() {
  const [caseImage, setCaseImage] = useState(null)
  const moreImage = projects.find((project) => project.image !== caseImage)?.image

  return (
    <>
    <section className="hero">
      <HeroScreen />
    </section>
    <div className="page">
        <div className="hero-intro">
          <p>{`That creates trailers, cinematics, cutscenes, user acquisition & marketing videos for PC, console, a nd mobile games. Heroic\u200B\u200B is a part of Room 8 Group. 60 Amazing Artists,  500+ Projects delivered`}</p>
        </div>

      <section className="section projects" id="projects">
        <div className="section-inner">
          <p className="section-label">Key projects &amp; clients</p>
        </div>
        <div className="projects-grid">
          {[0, 2, 4, 6].map((start) => (
            <div className="projects-row" key={start}>
              <ProjectCard
                size={projects[start].size}
                image={projects[start].image}
                onOpen={setCaseImage}
              />
              <ProjectCard
                size={projects[start + 1].size}
                image={projects[start + 1].image}
                onOpen={setCaseImage}
              />
            </div>
          ))}
        </div>
        <div className="clients">
          <ClientRow1 />
          <ClientRow2 />
        </div>
      </section>

      <div id="services" className="services-board">
        <ServicesFilm />
      </div>

      <SynergyVariantOne />
      <CaseStudy
        open={Boolean(caseImage)}
        image={caseImage}
        moreImage={moreImage}
        onClose={() => setCaseImage(null)}
      />
    </div>
    <SiteFooter variant="brand" />
    </>
  )
}
