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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const path = '/about'
  const title = `About ${SITE_NAME} - Release Date, Cars & Steam Guide`
  const description = `About ${SITE_NAME}, an unofficial fan resource for Forza Horizon 6 release date, Steam editions, car list, Japan map, Tokyo City, trailers, and guide updates.`

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

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About {SITE_NAME}
          </h1>
          <p className="text-slate-300 text-lg mb-2">
            An unofficial Forza Horizon 6 resource for release, Steam, cars, Japan, and community updates
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What This Site Covers</h2>
            <p>
              {SITE_NAME} is an unofficial fan-made resource website focused on helping players track the most useful
              Forza Horizon 6 information in one place. The site is built around release timing, Steam editions,
              official links, car list updates, Japan map details, Tokyo City information, PC requirements,
              achievements, trailers, and practical guide pages.
            </p>
            <p>
              Forza Horizon 6 is developed by Playground Games and published by Xbox Game Studios. This website is
              independent from those teams and does not represent official Forza communications.
            </p>

            <h2>Why It Exists</h2>
            <p>
              Pre-release racing game information often lives across several official pages, storefronts, trailers,
              forums, and community discussions. Our goal is to turn those scattered references into clear,
              source-aware summaries that are easy to revisit while users compare platforms, editions, release
              windows, early access details, and official community channels.
            </p>

            <h2>Editorial Focus</h2>
            <ul>
              <li><strong>Release:</strong> release date differences across official Forza, Steam, and regional storefronts</li>
              <li><strong>Steam:</strong> editions, pricing, store links, language support, and Steam Community access</li>
              <li><strong>Cars:</strong> official car list updates, JDM highlights, preorder bonuses, and collection notes</li>
              <li><strong>Map:</strong> Japan setting, Tokyo City, roads, locations, and open-world features</li>
              <li><strong>Technical:</strong> PC requirements, platform notes, achievements, and troubleshooting references</li>
              <li><strong>Community:</strong> official Discord, Forza Forums, Steam Community, Reddit, and official trailer links</li>
            </ul>

            <h2>Source Policy</h2>
            <p>
              We prioritize official Forza, Steam, Xbox, and publicly available platform pages for factual claims.
              Community channels can be useful for discussion trends, but they are not treated as primary sources
              for release details, prices, edition contents, or technical requirements.
            </p>

            <h2>Unofficial Fan Site Notice</h2>
            <p>
              {SITE_NAME} is not affiliated with, endorsed by, sponsored by, or associated with Playground Games,
              Turn 10 Studios, Xbox Game Studios, Microsoft, Valve, Steam, or the official Forza brand owners.
              All trademarks, game assets, and official materials belong to their respective owners.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-slate-900/30">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>Contact</h2>
            <p>
              Send corrections, source updates, or general site questions to the relevant mailbox below.
            </p>
            <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">General Inquiries</h3>
                <a href="mailto:contact@forzahorizon6.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contact@forzahorizon6.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Corrections</h3>
                <a href="mailto:support@forzahorizon6.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  support@forzahorizon6.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Content Updates</h3>
                <a href="mailto:contribute@forzahorizon6.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  contribute@forzahorizon6.wiki
                </a>
              </div>
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-semibold text-white mb-2">Legal</h3>
                <a href="mailto:legal@forzahorizon6.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  legal@forzahorizon6.wiki
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 border-y border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Follow Official Forza Horizon 6 Updates</h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Confirm purchases, release timing, editions, and account information through official Forza, Steam,
            and Xbox channels before making decisions.
          </p>
          <a
            href="https://forza.net/forzahorizon6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[hsl(var(--nav-theme-light))] text-white font-semibold hover:opacity-90 transition"
          >
            Visit Official Site
          </a>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
