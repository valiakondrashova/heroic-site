import { SiteFooter } from './SiteChrome.jsx'
import { Link } from './nav.jsx'

export default function CookiesPage({ title = 'Cookies Policy' }) {
  return (
    <div className="page page--inner">
      <article className="policy">
        <h1 className="policy-title">{title}</h1>
        <div className="policy-intro">
          <p>
            <span className="policy-link">Heroic</span>
            {' is pleased to welcome you to our website!'}
          </p>
          <p>
            {'By using our website '}
            <a href="https://room8group.com/" target="_blank" rel="noreferrer">
              https://room8group.com/
            </a>
            {`, you are consenting to our use of cookies and other analytical (tracking) technology in accordance with this Cookies Policy (hereinafter – “Policy”). If you do not agree to our use of cookies and other analytical (tracking) technology in mentioned below way, you should set your browser settings accordingly or not use our website.`}
          </p>
          <p>
            If you disable cookies that we use, this may impact your user experience while on the ROOM 8 GROUP’s website. Also, we would like to recommend to refer to the privacy policy (privacy notice, etc.) of the specific App on your device that you are using for internet connection to understand its specific data collection practices.
          </p>
        </div>

        <section className="policy-block">
          <h2>1. What Are Cookies?</h2>
          <div>
            <p>
              Cookies are a piece of data stored by a website within a browser, and then subsequently sent back to the same website by the browser. For example, storing login details or remembering message form information when leaving the website and returning later on. These are designed to help you quickly and easily navigate the Internet, to make websites work more efficiently, as well as to provide some kind of information to the website’s owners. As almost all of the websites, ROOM 8 GROUP uses cookies to provide you with the best experience during the session on our website.
            </p>
            <p>
              This Cookie Policy describes what information we gather by using the cookies as well as its types and the way of managing the disabling such cookies and similar analytical technologies. For more information about the kind of information we may collect, please read our{' '}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
            <p>
              {'If you interested in more additional general information on cookies, see the Wikipedia article on HTTP Cookies – '}
              <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank" rel="noreferrer">
                https://en.wikipedia.org/wiki/HTTP_cookie.
              </a>
            </p>
          </div>
        </section>

        <section className="policy-block">
          <h2>2. How We Use Cookies</h2>
          <div>
            <p>
              Cookies and similar analytical (tracking) technologies on our website allow us to track your browsing behavior, links clicked, and to collect various data, including analytics, about how you use and interact with the website. In other words, we use cookies to gain a better understanding how visitors use our website. All this information helps the ROOM 8 GROUP to provide you with a better experience, improve user-friendliness of our website, analyze and improve the performance of the services.
            </p>
            <p>ROOM 8 GROUP may also collect your location (IP address) to personalize the website. Be aware, that none of this data identifies you personally.</p>
          </div>
        </section>

        <section className="policy-block">
          <h2>3. Disabling Cookies</h2>
          <p>
            You can manage and remove the cookies by changes the settings on your browser. Please ensure that your computer/device setting reflects whether you are happy to accept cookies or not. Remember that if you use different computers/devices in different locations, you will need to ensure that each browser is adjusted to suit your cookie preferences. We recommend to use “help” button for manage cookies settings in your browser. Please, notice that disabling cookies will usually result disabling of the certain operation processes and may affect the functionality of this and other websites that you visit.
          </p>
        </section>

        <section className="policy-block">
          <h2>4. Types of Cookies We Use</h2>
          <div>
            <p>Essential cookies. Cookies are necessary for carrying out or facilitating the transmission of a communication or is strictly necessary for providing requested service, including a correct operation of the website, service continuity and site security.</p>
            <p>Forms related cookies. When you submit data to through a form such as those found on contact pages’ cookies may be set to remember your user details for future correspondence.</p>
            <p>Analytics and Advertising cookies. Tools that collect anonymous data about how visitors use the website and how it performs. ROOM 8 GROUP uses this to improve the services and user experience.</p>
            <p>ROOM 8 GROUP, its affiliated persons and subcontractors may use web server log files and tracking technologies to collect and analyze certain types of technical information, such as cookies, IP addresses, device type, and usage information, including time spent on particular pages or number of clicks. These cookies help us to understand the effectiveness of the website, services, and/or marketing campaigns.</p>
            <p>Our analytics partners use browser cookies to generate statistics about visitors to websites, such as the number of page views or times of peak traffic. Our analytics partners include without limitation the following third parties. Please follow the links below for further information concerning the privacy policies and opt-out choices for the cookies offered by these third parties.</p>
            <p>
              {'Facebook (Facebook pixel): '}
              <a href="https://www.facebook.com/policy.php" target="_blank" rel="noreferrer">
                https://www.facebook.com/policy.php.
              </a>
            </p>
            <p>
              {'Google Analytics: '}
              <a href="https://support.google.com/analytics/answer/6004245?hl=en" target="_blank" rel="noreferrer">
                https://support.google.com/analytics/answer/6004245?hl=en
              </a>
              {'; '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer">
                https://tools.google.com/dlpage/gaoptout.
              </a>
            </p>
          </div>
        </section>

        <section className="policy-block">
          <h2>5. Cookies Policy update</h2>
          <p>ROOM 8 GROUP reserves the right to make any changes and corrections to this Policy. Please refer to this page from time to time to review these and new additional information.</p>
        </section>

        <section className="policy-block">
          <h2>6. More Information</h2>
          <p>
            If you are looking for more information you may contact us through the email:
            <a href="mailto:dpo@room8group.com"> dpo@room8group.com</a>
          </p>
        </section>
      </article>
      <SiteFooter cta={false} />
    </div>
  )
}
