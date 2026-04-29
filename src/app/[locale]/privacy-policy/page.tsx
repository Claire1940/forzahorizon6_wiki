import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

const SITE_NAME = 'Forza Horizon 6'
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://forzahorizon6.wiki').replace(/\/$/, '')
const HERO_IMAGE_URL = new URL('/images/hero.webp', SITE_URL).toString()
const UPDATED_AT = 'April 29, 2026'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const path = '/privacy-policy'
  const title = `Privacy Policy - ${SITE_NAME}`
  const description = `Privacy Policy for ${SITE_NAME}. Learn how this unofficial Forza Horizon 6 resource site collects analytics data, uses cookies, and protects user privacy.`

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: HERO_IMAGE_URL,
          width: 1920,
          height: 1080,
          alt: 'Forza Horizon 6 key art',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [HERO_IMAGE_URL],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, SITE_URL),
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            How this Forza Horizon 6 resource site handles visitor information
          </p>
          <p className="text-slate-400 text-sm">
            Last Updated: {UPDATED_AT}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              {SITE_NAME} ("we", "our", or "us") is an unofficial fan-made resource website for Forza Horizon 6.
              We collect only limited information needed to operate, secure, and improve the website.
            </p>
            <ul>
              <li><strong>Usage data:</strong> pages visited, referral sources, approximate location, device type, browser type, and basic diagnostics.</li>
              <li><strong>Cookie data:</strong> cookies or similar technologies used for analytics, language preferences, performance, and ad measurement.</li>
              <li><strong>Voluntary contact data:</strong> information you choose to send by email, such as your address, message, and related context.</li>
            </ul>

            <h2>2. How We Use Information</h2>
            <p>We use collected information to:</p>
            <ul>
              <li>Operate and maintain the website</li>
              <li>Understand which Forza Horizon 6 release, Steam, car list, map, trailer, and guide pages users find useful</li>
              <li>Improve page performance, navigation, language routing, and content quality</li>
              <li>Detect abuse, spam, security issues, and technical errors</li>
              <li>Respond to legitimate privacy, legal, or support requests</li>
            </ul>

            <h2>3. Analytics and Cookies</h2>
            <p>
              We may use analytics and advertising services such as Google Analytics, Google AdSense, and Microsoft Clarity.
              These services may collect cookies, device identifiers, IP-derived location, browsing events, and interaction data.
              We use this information in aggregate to improve the site and understand audience behavior.
            </p>
            <p>
              You can manage cookies through your browser settings. Disabling cookies may affect analytics, ads,
              preference storage, and some convenience features, but the core content should remain accessible.
            </p>

            <h2>4. Third-Party Links</h2>
            <p>
              Our pages link to external resources such as the official Forza site, Steam, Xbox, YouTube, Discord,
              Forza Forums, Steam Community, and Reddit. Those websites are operated by third parties and have their
              own privacy policies. We are not responsible for their data practices.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              Analytics and diagnostic data is retained only as long as reasonably necessary for reporting,
              security, and site improvement. Email correspondence may be retained as needed to handle the request
              and maintain legal or operational records.
            </p>

            <h2>6. Your Choices</h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, or restrict certain
              personal information. You may also opt out of many analytics and ad tracking tools through your browser,
              device settings, or third-party opt-out mechanisms.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              This website is intended for a general audience and does not knowingly collect personal information
              from children under 13. If you believe a child provided personal information, contact us and we will
              take appropriate steps to remove it.
            </p>

            <h2>8. Security</h2>
            <p>
              We use reasonable technical and organizational safeguards, but no online service can guarantee perfect
              security. Please avoid sending sensitive personal information through email or public channels.
            </p>

            <h2>9. Unofficial Fan Site Notice</h2>
            <p>
              {SITE_NAME} is not affiliated with, endorsed by, sponsored by, or associated with Playground Games,
              Turn 10 Studios, Xbox Game Studios, Microsoft, Valve, Steam, or the official Forza brand owners.
              Game names, trademarks, artwork, and related assets belong to their respective owners.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The date above shows when it was last revised.
              Continued use of the website after changes are posted means you accept the updated policy.
            </p>

            <h2>11. Contact</h2>
            <p>
              For privacy questions or requests, contact us at{' '}
              <a href="mailto:privacy@forzahorizon6.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                privacy@forzahorizon6.wiki
              </a>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
