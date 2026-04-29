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
  const path = '/terms-of-service'
  const title = `Terms of Service - ${SITE_NAME}`
  const description = `Terms of Service for ${SITE_NAME}, an unofficial Forza Horizon 6 release date, Steam edition, car list, Japan map, and guide resource.`

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

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Terms for using this unofficial Forza Horizon 6 resource
          </p>
          <p className="text-slate-400 text-sm">
            Last Updated: {UPDATED_AT}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using {SITE_NAME} ("the website", "we", "our", or "us"), you agree to these Terms
              of Service. If you do not agree, please do not use the website.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              {SITE_NAME} is an unofficial fan-made information site covering Forza Horizon 6 release timing,
              Steam and Xbox links, editions, car list updates, Japan map details, Tokyo City information,
              system requirements, achievements, trailers, and related guide content.
            </p>
            <p>
              The website is provided for informational and community reference purposes only. It is not an official
              Forza product, support channel, storefront, or publisher communication channel.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the website for unlawful, abusive, deceptive, or harmful purposes</li>
              <li>Attempt to disrupt, overload, scrape, reverse engineer, or compromise the website or its infrastructure</li>
              <li>Copy, republish, or resell website content at scale without permission</li>
              <li>Misrepresent the website as an official Forza, Xbox, Steam, or Microsoft property</li>
              <li>Send malicious code, spam, or unauthorized automated requests</li>
            </ul>

            <h2>4. Content Accuracy</h2>
            <p>
              We try to keep information accurate and current, but Forza Horizon 6 details may change before or after
              release. Storefront dates, prices, platform availability, car lists, editions, system requirements,
              and community links may vary by region, time zone, or official update.
            </p>
            <p>
              Always confirm purchase, preorder, release, and account information on official Forza, Steam, and Xbox
              channels before making decisions.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              Our original text, layout, and site presentation are owned by this website unless otherwise stated.
              Forza Horizon 6 names, trademarks, logos, artwork, screenshots, trailers, and related game assets are
              owned by their respective rights holders.
            </p>
            <p>
              We reference third-party marks and assets under fair use and nominative use principles for commentary,
              news, guide, and informational purposes.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              The website links to external platforms such as Forza.net, Steam, Xbox, YouTube, Discord, Forza Forums,
              Steam Community, and Reddit. We do not control those services and are not responsible for their content,
              availability, policies, pricing, accounts, or transactions.
            </p>

            <h2>7. Disclaimers</h2>
            <p>
              The website is provided "as is" and "as available" without warranties of any kind. We do not guarantee
              uninterrupted availability, error-free content, complete accuracy, or that all third-party links will
              remain available.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, {SITE_NAME} will not be liable for indirect, incidental,
              consequential, special, punitive, or exemplary damages arising from your use of or inability to use
              the website.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We may update these Terms of Service at any time. The date above indicates when the terms were last
              revised. Continued use of the website after changes are posted means you accept the updated terms.
            </p>

            <h2>10. Unofficial Fan Site Notice</h2>
            <p>
              {SITE_NAME} is not affiliated with, endorsed by, sponsored by, or associated with Playground Games,
              Turn 10 Studios, Xbox Game Studios, Microsoft, Valve, Steam, or the official Forza brand owners.
            </p>

            <h2>11. Contact</h2>
            <p>
              For legal questions about these terms, contact us at{' '}
              <a href="mailto:legal@forzahorizon6.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                legal@forzahorizon6.wiki
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
