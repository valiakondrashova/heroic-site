import { SiteFooter } from './SiteChrome.jsx'
import { ApplyFormVariantOne, VacancyDescVariantOne } from './VacancyVariants.jsx'

export default function VacancyPage() {
  return (
    <div className="page page--inner">
      <VacancyDescVariantOne />
      <ApplyFormVariantOne id="apply" clipStart={49} clipEnd={51} />
      <SiteFooter />
    </div>
  )
}
