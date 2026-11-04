import { SiteFooter } from './SiteChrome.jsx'
import { Link } from './nav.jsx'

const frames = [
  '/assets/rect15048.jpg',
  '/assets/rect15049.jpg',
  '/assets/rect15051.jpg',
  '/assets/rect15052.jpg',
  '/assets/rect15053.jpg',
  '/assets/rect15054.jpg',
  '/assets/rect15055.jpg',
  '/assets/rect15056.jpg',
]

function ArrowRight() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
      <path d="M0 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export default function NotFound() {
  return (
    <div className="page page--inner page--404">
      <section className="nf">
        <p className="section-label">404. Page not found</p>
        <h1>Sorry, the page you’re looking for doesn’t seem to be here.</h1>
        <Link className="footer-touch nf-home" href="/">
          Go to our home page
          <ArrowRight />
        </Link>
      </section>
      <div className="nf-strip" aria-hidden="true">
        {frames.map((src, i) => (
          <img key={src} className={i === 1 || i === 4 ? 'is-tall' : 'is-short'} src={src} alt="" />
        ))}
      </div>
      <SiteFooter />
    </div>
  )
}
