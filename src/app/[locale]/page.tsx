import { getLatestArticles } from '@/lib/getLatestArticles'
import type { Language } from '@/lib/content'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/routing'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

const SITE_NAME = 'Forza Horizon 6'
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://forzahorizon6.wiki').replace(/\/$/, '')
const HERO_IMAGE_URL = new URL('/images/hero.webp', SITE_URL).toString()
const SEO_TITLE = 'Forza Horizon 6 - Release Date, Car List & Steam'
const SEO_DESCRIPTION =
  'Forza Horizon 6 guide for release date, Steam editions, car list, Japan map, Tokyo City, system requirements, early access, trailers and gameplay updates.'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const pageUrl = locale === 'en' ? SITE_URL : `${SITE_URL}/${locale}`

  return {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    alternates: buildLanguageAlternates('/', locale as Locale, SITE_URL),
    openGraph: {
      type: 'website',
      locale,
      url: pageUrl,
      siteName: SITE_NAME,
      title: SEO_TITLE,
      description: SEO_DESCRIPTION,
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
      title: SEO_TITLE,
      description: SEO_DESCRIPTION,
      images: [HERO_IMAGE_URL],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const pageUrl = locale === 'en' ? SITE_URL : `${SITE_URL}/${locale}`
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": SITE_NAME,
        "alternateName": 'Forza Horizon 6 Wiki',
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": new URL('/android-chrome-512x512.png', SITE_URL).toString(),
          "width": 512,
          "height": 512,
        },
        "image": {
          "@type": "ImageObject",
          "url": HERO_IMAGE_URL,
          "width": 1920,
          "height": 1080,
          "caption": 'Forza Horizon 6 Japan key art',
        },
        "sameAs": [
          'https://forza.net/forzahorizon6',
          'https://store.steampowered.com/app/2483190/Forza_Horizon_6/',
          'https://www.xbox.com/en-US/games/forza-horizon-6',
          'https://discord.com/invite/forza',
          'https://forums.forza.net/',
          'https://steamcommunity.com/app/2483190',
          'https://www.reddit.com/r/ForzaHorizon/',
          'https://www.youtube.com/watch?v=VXedKqX5Wa4',
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": SITE_NAME,
        "description": SEO_DESCRIPTION,
        "image": HERO_IMAGE_URL,
        "publisher": {
          "@id": `${SITE_URL}/#organization`,
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${SITE_URL}/search?q={search_term_string}`,
          "query-input": 'required name=search_term_string',
        },
      },
      {
        "@type": "VideoGame",
        "name": SITE_NAME,
        "url": 'https://forza.net/forzahorizon6',
        "image": HERO_IMAGE_URL,
        "gamePlatform": ['Xbox Series X|S', 'PC', 'Steam'],
        "applicationCategory": 'Game',
        "genre": ['Open-world racing', 'Racing', 'Driving'],
        "publisher": {
          "@type": "Organization",
          "name": 'Xbox Game Studios',
        },
        "developer": {
          "@type": "Organization",
          "name": 'Playground Games',
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": 'USD',
          "price": '69.99',
          "availability": 'https://schema.org/PreOrder',
          "url": 'https://store.steampowered.com/app/2483190/Forza_Horizon_6/',
        },
      },
      {
        "@type": "VideoObject",
        "name": 'Forza Horizon 6 - Official Teaser Trailer',
        "description": 'Official Forza Horizon 6 teaser trailer from Tokyo Game Show 2025.',
        "thumbnailUrl": HERO_IMAGE_URL,
        "embedUrl": 'https://www.youtube.com/embed/VXedKqX5Wa4',
        "url": 'https://www.youtube.com/watch?v=VXedKqX5Wa4',
        "publisher": {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": SEO_TITLE,
        "description": SEO_DESCRIPTION,
        "isPartOf": {
          "@id": `${SITE_URL}/#website`,
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": HERO_IMAGE_URL,
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient latestArticles={latestArticles} locale={locale} />
    </>
  )
}
