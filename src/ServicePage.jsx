import { useState } from 'react'
import { SiteFooter } from './SiteChrome.jsx'
import CaseStudy from './CaseStudy.jsx'
import { getService } from './services.js'
import { ServicesVariantOne } from './ServicesVariants.jsx'
import { ServiceWorkSelected, WhyChooseUs } from './ServicePageVariants.jsx'

export default function ServicePage({ slug }) {
  const service = getService(slug)
  const [caseImage, setCaseImage] = useState(null)
  const moreImage = service.videos.find((v) => v !== caseImage) || service.videos[1]

  return (
    <div className="page page--inner">

      <div className="svc-top">
        <section className="svc-hero svc-hero--fig">
          <h1>{service.title}</h1>
          <p>{service.lead}</p>
        </section>

        <ServiceWorkSelected service={service} onOpen={setCaseImage} />
        <ServicesVariantOne excludeSlug={service.slug} label={null} titlesOnly />
      </div>
      <WhyChooseUs />

      <SiteFooter />
      <CaseStudy
        open={Boolean(caseImage)}
        image={caseImage}
        moreImage={moreImage}
        onClose={() => setCaseImage(null)}
      />
    </div>
  )
}
