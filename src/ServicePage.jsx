import { useState } from 'react'
import { SiteFooter } from './SiteChrome.jsx'
import CaseStudy from './CaseStudy.jsx'
import { getService } from './services.js'
import { ServicesVariantOne } from './ServicesVariants.jsx'
import { ServiceWorkSelected, WhyChooseUs } from './ServicePageVariants.jsx'
import { ReelFrame } from './Reel.jsx'
import { Link } from './nav.jsx'

export default function ServicePage({ slug }) {
  const service = getService(slug)
  const [caseClip, setCaseClip] = useState(null)
  const moreImage = service.clips.find((clip) => clip.id !== caseClip?.id)?.image

  return (
    <div className="page page--inner page--service">
      <div className="svc-banner">
        <ReelFrame className="svc-banner-frame" title="Superior" videoId="801240616" />
      </div>

      <div className="svc-top">
        <section className="svc-hero svc-hero--fig">
          <h1>{service.title}</h1>
          <div className="svc-hero-row">
            <p>{service.lead}</p>
            <Link className="svc-hero-ring" href="/contact" aria-label="Let's talk">
            <span className="ring-shot" aria-hidden="true">
              <ReelFrame fit="height" title="" start={40} end={42} />
            </span>
            <span className="svc-hero-ring-label">
              Let's talk
              <svg width="11" height="10" viewBox="0 0 11 10" fill="none" aria-hidden="true">
                <path d="M1 5H10M10 5L6 1M10 5L6 9" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            </Link>
          </div>
        </section>

        <ServiceWorkSelected service={service} onOpen={setCaseClip} />
        <ServicesVariantOne excludeSlug={service.slug} label={null} titlesOnly />
      </div>
      <WhyChooseUs />

      <SiteFooter />
      <CaseStudy
        open={Boolean(caseClip)}
        project={caseClip}
        moreImage={moreImage}
        onClose={() => setCaseClip(null)}
      />
    </div>
  )
}
