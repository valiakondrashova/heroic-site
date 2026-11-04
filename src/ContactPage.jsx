import { SiteFooter } from './SiteChrome.jsx'
import { ApplyFormVariantOne } from './VacancyVariants.jsx'
import { TeamVariantThree, TimeZones } from './ContactVariants.jsx'

export default function ContactPage() {
  return (
    <div className="page page--inner">
      <ApplyFormVariantOne title="Start your journey with Heroic" heading="h1" lede={false} clipStart={64} clipEnd={66} />
      <TeamVariantThree />
      <TimeZones />
      <SiteFooter variant="brand" cta={false} />
    </div>
  )
}
