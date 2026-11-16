import { SiteFooter } from './SiteChrome.jsx'
import { CareersVariantThree, RoomOpportunities } from './CareersVariants.jsx'

export default function CareersPage() {
  return (
    <div className="page page--inner page--careers">
      <CareersVariantThree />
      <RoomOpportunities />
      <SiteFooter />
    </div>
  )
}
