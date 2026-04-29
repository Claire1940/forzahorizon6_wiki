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
  const path = '/copyright'
  const title = `Copyright Notice - ${SITE_NAME}`
  const description = `Copyright and intellectual property notice for ${SITE_NAME}, an unofficial Forza Horizon 6 wiki and guide resource.`

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

export default function Copyright() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Copyright Notice
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            Intellectual property, attribution, and DMCA information
          </p>
          <p className="text-slate-400 text-sm">
            Last Updated: {UPDATED_AT}
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Website Content</h2>
            <p>
              Copyright 2026 {SITE_NAME}. Unless otherwise stated, original text, organization, layout,
              and site-specific commentary on this website are owned by this website and protected by applicable
              copyright laws.
            </p>

            <h2>2. Game Assets and Trademarks</h2>
            <p>
              {SITE_NAME} is an unofficial fan-made resource. Forza Horizon 6, Forza Horizon, Forza Motorsport,
              Xbox, Microsoft, Steam, and related names, marks, logos, images, trailers, screenshots, product pages,
              and game assets are owned by their respective rights holders.
            </p>
            <p>
              We reference these materials for informational, educational, commentary, news, and guide purposes.
              No endorsement, sponsorship, or official relationship is implied.
            </p>

            <h2>3. Fair Use and Nominative Use</h2>
            <p>
              References to official Forza Horizon 6 pages, Steam listings, Xbox pages, trailers, release details,
              and public community resources are used to identify and discuss the game. We aim to use only what is
              necessary to make the content understandable and useful to players.
            </p>

            <h2>4. User Contributions</h2>
            <p>
              If you submit corrections, suggestions, or other material, you confirm that you have the right to share
              it and grant us a non-exclusive permission to use it for website operation, editing, publication,
              and maintenance.
            </p>

            <h2>5. Permitted Use</h2>
            <p>You may:</p>
            <ul>
              <li>Read and share links to website pages</li>
              <li>Quote short excerpts with clear attribution and a link back to the original page</li>
              <li>Use the website for personal, non-commercial research and gameplay planning</li>
            </ul>
            <p>You may not:</p>
            <ul>
              <li>Copy or republish large portions of the website without permission</li>
              <li>Use automated scraping to clone or redistribute the site</li>
              <li>Remove attribution or misrepresent our original content as your own</li>
              <li>Use the site in a way that suggests official Forza, Xbox, Microsoft, Steam, or Playground Games endorsement</li>
            </ul>

            <h2>6. DMCA Notices</h2>
            <p>
              If you believe material on this website infringes your copyright, send a notice that includes:
              your contact information, identification of the copyrighted work, the URL or description of the
              allegedly infringing material, a good-faith statement, an accuracy statement under penalty of perjury,
              and your physical or electronic signature.
            </p>
            <p>
              Send DMCA notices to{' '}
              <a href="mailto:dmca@forzahorizon6.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                dmca@forzahorizon6.wiki
              </a>.
            </p>

            <h2>7. Contact</h2>
            <p>
              For copyright questions, attribution requests, or licensing inquiries, contact{' '}
              <a href="mailto:copyright@forzahorizon6.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                copyright@forzahorizon6.wiki
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
