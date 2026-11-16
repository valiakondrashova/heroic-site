import { ReelFrame } from './Reel.jsx'

const services = [
  { label: 'Pre- production', href: '/services/pre-production' },
  { label: 'In-game cutscenes', href: '/services/in-game-cutscenes' },
  { label: 'Gameplay trailers', href: '/services/gameplay-trailers' },
  { label: 'Trailers & cinematics', href: '/services/trailers-cinematics' },
  { label: 'User acquisition videos', href: '/services/user-acquisition-videos' },
]

const primary = [
  { label: 'About us', href: '/' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contacts', href: '/contact' },
]

const socials = [
  { label: 'Facebook', icon: '/assets/menu-facebook.svg', href: '#facebook' },
  { label: 'Vimeo', icon: '/assets/menu-vimeo.svg', href: '#vimeo' },
  { label: 'Instagram', icon: '/assets/menu-instagram.svg', href: '#instagram' },
  { label: 'LinkedIn', icon: '/assets/menu-linkedin.svg', href: '#linkedin' },
]

function MenuArrow() {
  return (
    <svg className="menu-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12V13H13V12V11H3V12ZM22 12L12 6.2265V17.7735L22 12Z" fill="currentColor" />
    </svg>
  )
}

export function MenuOriginal({ go }) {
  return (
    <section className="mnv mnv-original">
      <div className="menu-stage">
        <nav className="menu-primary" aria-label="Primary">
          {primary.map((item) => (
            <a key={item.label} className="menu-link" href={item.href} onClick={go(item.href)}>
              {item.label}
              <MenuArrow />
            </a>
          ))}
        </nav>
        <nav className="menu-services" aria-label="Our services">
          <p className="menu-services-label">Our services</p>
          {services.map((item) => (
            <a key={item.label} className="menu-link menu-link--service" href={item.href} onClick={go(item.href)}>
              {item.label}
              <MenuArrow />
            </a>
          ))}
        </nav>
      </div>
      <div className="menu-foot">
        <div className="menu-reel" aria-hidden="true">
          <div className="menu-reel-shot">
            <ReelFrame fit="height" title="" start={40} end={42} />
          </div>
        </div>
        <div className="menu-social">
          {socials.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label}>
              <img src={s.icon} alt="" />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
