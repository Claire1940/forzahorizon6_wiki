'use client'

import { useEffect, Suspense, lazy } from 'react'
import {
  ArrowRight,
  BookOpen,
  Car,
  ChevronDown,
  Check,
  Clock,
  Gamepad2,
  Home,
  Map,
  Monitor,
  Package,
  Route,
  Settings,
  Sparkles,
  Video,
  Wrench,
} from 'lucide-react'
import { useMessages } from 'next-intl'
import { VideoFeature } from '@/components/home/VideoFeature'
import { LatestGuidesAccordion } from '@/components/home/LatestGuidesAccordion'
import { NativeBannerAd, AdBanner } from '@/components/ads'
import { SidebarAd } from '@/components/ads/SidebarAd'
import { scrollToSection } from '@/lib/scrollToSection'
import { DynamicIcon } from '@/components/ui/DynamicIcon'
import type { ContentItemWithType } from '@/lib/getLatestArticles'

// Lazy load heavy components
const HeroStats = lazy(() => import('@/components/home/HeroStats'))
const FAQSection = lazy(() => import('@/components/home/FAQSection'))
const CTASection = lazy(() => import('@/components/home/CTASection'))

// Loading placeholder
const LoadingPlaceholder = ({ height = 'h-64' }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
)

interface HomePageClientProps {
  latestArticles: ContentItemWithType[]
  locale: string
}

export default function HomePageClient({ latestArticles, locale }: HomePageClientProps) {
  const t = useMessages() as any


  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-reveal').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 左侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ left: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>

      {/* 右侧广告容器 - Fixed 定位 */}
      <aside
        className="hidden xl:block fixed top-20 w-40 z-10"
        style={{ right: 'calc((100vw - 896px) / 2 - 180px)' }}
      >
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      {/* 广告位 1: 移动端横幅 Sticky */}
      {/* <div className="sticky top-20 z-20 border-b border-border py-2">
        <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />
      </div> */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                            bg-[hsl(var(--nav-theme)/0.1)]
                            border border-[hsl(var(--nav-theme)/0.3)] mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.hero.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a
                href="https://forza.net/forzahorizon6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)]
                           text-white rounded-lg font-semibold text-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </a>
              <a
                href="https://store.steampowered.com/app/2483190/Forza_Horizon_6/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4
                           border border-border hover:bg-white/10 rounded-lg
                           font-semibold text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      {/* 广告位 2: 原生横幅 */}
      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ''} />

      {/* Video Section */}
      <section className="px-4 py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden">
            <VideoFeature
              videoId="VXedKqX5Wa4"
              title="Forza Horizon 6 - Official Teaser Trailer | Tokyo Game Show 2025"
              posterImage="/images/hero.webp"
            />
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={30} />

      {/* Tools Grid - 12 Navigation Cards */}
      <section className="px-4 py-20 bg-card/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.tools.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="#forza-horizon-6-release-date"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-release-date')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[0].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[0].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[0].description}</p>
            </a>

            <a
              href="#forza-horizon-6-steam-pre-order"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-steam-pre-order')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '50ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[1].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[1].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[1].description}</p>
            </a>

            <a
              href="#forza-horizon-6-editions-and-price"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-editions-and-price')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '100ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[2].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[2].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[2].description}</p>
            </a>

            <a
              href="#forza-horizon-6-game-pass"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-game-pass')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '150ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[3].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[3].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[3].description}</p>
            </a>

            <a
              href="#forza-horizon-6-ps5-release"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-ps5-release')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '200ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[4].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[4].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[4].description}</p>
            </a>

            <a
              href="#forza-horizon-6-system-requirements"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-system-requirements')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '250ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[5].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[5].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[5].description}</p>
            </a>

            <a
              href="#forza-horizon-6-japan-map"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-japan-map')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '300ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[6].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[6].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[6].description}</p>
            </a>

            <a
              href="#forza-horizon-6-tokyo-city"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-tokyo-city')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '350ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[7].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[7].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[7].description}</p>
            </a>

            <a
              href="#forza-horizon-6-car-list"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-car-list')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '400ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[8].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[8].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[8].description}</p>
            </a>

            <a
              href="#forza-horizon-6-jdm-cars-and-customization"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-jdm-cars-and-customization')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '450ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[9].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[9].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[9].description}</p>
            </a>

            <a
              href="#forza-horizon-6-trailer-and-gameplay"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-trailer-and-gameplay')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '500ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[10].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[10].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[10].description}</p>
            </a>

            <a
              href="#forza-horizon-6-beginner-guide"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection('forza-horizon-6-beginner-guide')
              }}
              className="scroll-reveal group p-6 rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]"
              style={{ animationDelay: '550ms' }}
            >
              <div className="w-12 h-12 rounded-lg mb-4 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
                <DynamicIcon name={t.tools.cards[11].icon} className="w-6 h-6 text-[hsl(var(--nav-theme-light))]" />
              </div>
              <h3 className="font-semibold mb-2">{t.tools.cards[11].title}</h3>
              <p className="text-sm text-muted-foreground">{t.tools.cards[11].description}</p>
            </a>
          </div>
        </div>
      </section>

      {/* 广告位 3: 标准横幅 728×90 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* 广告位 4: 方形广告 300×250 */}
      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} />

      {/* Module 1: Forza Horizon 6 Release Date */}
      <section id="forza-horizon-6-release-date" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Clock className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[0].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6ReleaseDate.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.forzaHorizon6ReleaseDate.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.forzaHorizon6ReleaseDate.items.map((item: any, index: number) => (
              <div
                key={item.label}
                className={index === 0
                  ? 'p-6 bg-card border rounded-lg transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] md:col-span-2 border-[hsl(var(--nav-theme)/0.45)]'
                  : 'p-6 bg-card border rounded-lg transition-colors hover:border-[hsl(var(--nav-theme)/0.5)] border-border'}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                  <h3 className="font-bold text-xl">{item.label}</h3>
                  <span className="inline-flex w-fit items-center rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] px-3 py-1 text-sm font-semibold text-[hsl(var(--nav-theme-light))]">
                    {item.value}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-3 gap-3">
            {t.modules.forzaHorizon6ReleaseDate.summary.map((point: string) => (
              <div key={point} className="flex items-start gap-3 rounded-lg border border-[hsl(var(--nav-theme)/0.25)] bg-[hsl(var(--nav-theme)/0.05)] p-4">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                <p className="text-sm text-muted-foreground">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 5: 中型横幅 468×60 */}
      <AdBanner type="banner-468x60" adKey={process.env.NEXT_PUBLIC_AD_BANNER_468X60} />

      {/* Module 2: Forza Horizon 6 Steam Pre-Order */}
      <section id="forza-horizon-6-steam-pre-order" className="scroll-mt-24 px-4 py-20 bg-card/40">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <BookOpen className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[1].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6SteamPreOrder.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.forzaHorizon6SteamPreOrder.intro}
            </p>
          </div>

          <div className="scroll-reveal relative space-y-5">
            <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-[hsl(var(--nav-theme)/0.3)] md:block" />
            {t.modules.forzaHorizon6SteamPreOrder.steps.map((step: any, index: number) => (
              <div key={step.title} className="relative flex gap-4 rounded-lg border border-border bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-background text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 3: Forza Horizon 6 Editions and Price */}
      <section id="forza-horizon-6-editions-and-price" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Package className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[2].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6EditionsAndPrice.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.forzaHorizon6EditionsAndPrice.intro}
            </p>
          </div>

          <div className="scroll-reveal hidden overflow-hidden rounded-lg border border-border bg-card lg:block">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[hsl(var(--nav-theme)/0.08)]">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold">Forza Horizon 6 Edition</th>
                  <th className="px-5 py-4 text-sm font-semibold">Price</th>
                  <th className="px-5 py-4 text-sm font-semibold">Access</th>
                  <th className="px-5 py-4 text-sm font-semibold">Included Content</th>
                  <th className="px-5 py-4 text-sm font-semibold">Best For</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.forzaHorizon6EditionsAndPrice.items.map((item: any) => (
                  <tr key={item.edition} className="border-t border-border align-top">
                    <td className="px-5 py-5 font-bold text-[hsl(var(--nav-theme-light))]">{item.edition}</td>
                    <td className="px-5 py-5 font-semibold">{item.price}</td>
                    <td className="px-5 py-5 text-sm text-muted-foreground">{item.access}</td>
                    <td className="px-5 py-5">
                      <ul className="space-y-2">
                        {item.includes.map((entry: string) => (
                          <li key={entry} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                            <span>{entry}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-5 py-5 text-sm text-muted-foreground">{item.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {t.modules.forzaHorizon6EditionsAndPrice.items.map((item: any) => (
              <div key={item.edition} className="rounded-lg border border-border bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="text-xl font-bold text-[hsl(var(--nav-theme-light))]">{item.edition}</h3>
                  <span className="rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] px-3 py-1 text-sm font-semibold">{item.price}</span>
                </div>
                <p className="text-sm font-semibold mb-3">{item.access}</p>
                <ul className="space-y-2 mb-4">
                  {item.includes.map((entry: string) => (
                    <li key={entry} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                      <span>{entry}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">{item.bestFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 4: Forza Horizon 6 Game Pass */}
      <section id="forza-horizon-6-game-pass" className="scroll-mt-24 px-4 py-20 bg-card/40">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Gamepad2 className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[3].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6GamePass.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.forzaHorizon6GamePass.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.modules.forzaHorizon6GamePass.items.map((item: any) => (
              <div key={item.label} className="rounded-lg border border-border bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h3 className="font-bold text-lg">{item.label}</h3>
                  <span className="rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                    {item.value}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 5: Forza Horizon 6 PS5 Release */}
      <section id="forza-horizon-6-ps5-release" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Monitor className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[4].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6Ps5Release.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.forzaHorizon6Ps5Release.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 lg:grid-cols-2 gap-4">
            {t.modules.forzaHorizon6Ps5Release.items.map((item: any) => (
              <details key={item.question} className="group rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-bold leading-snug">{item.question}</span>
                  <ChevronDown className="mt-1 h-5 w-5 flex-shrink-0 text-[hsl(var(--nav-theme-light))] transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">{item.answer}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {item.highlights.map((highlight: string) => (
                      <div key={highlight} className="flex items-start gap-2 rounded-md border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.04)] px-3 py-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Forza Horizon 6 System Requirements */}
      <section id="forza-horizon-6-system-requirements" className="scroll-mt-24 px-4 py-20 bg-card/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Settings className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[5].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6SystemRequirements.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.forzaHorizon6SystemRequirements.intro}
            </p>
          </div>

          <div className="scroll-reveal hidden overflow-hidden rounded-lg border border-border bg-card lg:block">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[hsl(var(--nav-theme)/0.08)]">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold">Forza Horizon 6 PC Spec</th>
                  <th className="px-5 py-4 text-sm font-semibold">Minimum</th>
                  <th className="px-5 py-4 text-sm font-semibold">Recommended</th>
                  <th className="px-5 py-4 text-sm font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.forzaHorizon6SystemRequirements.items.map((item: any) => (
                  <tr key={item.spec} className="border-t border-border align-top">
                    <td className="px-5 py-5 font-bold text-[hsl(var(--nav-theme-light))]">{item.spec}</td>
                    <td className="px-5 py-5 text-sm text-muted-foreground">{item.minimum}</td>
                    <td className="px-5 py-5 text-sm text-muted-foreground">{item.recommended}</td>
                    <td className="px-5 py-5 text-sm text-muted-foreground">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {t.modules.forzaHorizon6SystemRequirements.items.map((item: any) => (
              <div key={item.spec} className="rounded-lg border border-border bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <h3 className="text-xl font-bold text-[hsl(var(--nav-theme-light))] mb-4">{item.spec}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-1">Minimum</p>
                    <p className="text-sm font-semibold">{item.minimum}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-muted-foreground mb-1">Recommended</p>
                    <p className="text-sm font-semibold">{item.recommended}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.notes}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: Forza Horizon 6 Japan Map */}
      <section id="forza-horizon-6-japan-map" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Map className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[6].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6JapanMap.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.forzaHorizon6JapanMap.intro}
            </p>
          </div>

          <div className="scroll-reveal space-y-4">
            {t.modules.forzaHorizon6JapanMap.items.map((item: any) => (
              <details key={item.question} className="group rounded-lg border border-border bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-lg font-bold leading-snug">{item.question}</span>
                  <ChevronDown className="mt-1 h-5 w-5 flex-shrink-0 text-[hsl(var(--nav-theme-light))] transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed text-muted-foreground mb-5">{item.answer}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {item.highlights.map((highlight: string) => (
                      <div key={highlight} className="flex items-start gap-2 rounded-md border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.04)] px-3 py-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Module 8: Forza Horizon 6 Tokyo City */}
      <section id="forza-horizon-6-tokyo-city" className="scroll-mt-24 px-4 py-20 bg-card/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Home className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[7].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6TokyoCity.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              {t.modules.forzaHorizon6TokyoCity.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {t.modules.forzaHorizon6TokyoCity.items.map((item: any, index: number) => (
              <div
                key={item.title}
                className={index === 0
                  ? 'rounded-lg border border-[hsl(var(--nav-theme)/0.45)] bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.7)] transition-colors md:col-span-2'
                  : 'rounded-lg border border-border bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors'}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                    {item.meta}
                  </span>
                  <span className="text-sm font-bold text-[hsl(var(--nav-theme-light))]">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 9: Forza Horizon 6 Car List */}
      <section id="forza-horizon-6-car-list" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Car className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[8].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6CarList.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-4">
              {t.modules.forzaHorizon6CarList.subtitle}
            </p>
            <p className="text-muted-foreground max-w-4xl mx-auto">
              {t.modules.forzaHorizon6CarList.intro}
            </p>
          </div>

          <div className="scroll-reveal hidden overflow-hidden rounded-lg border border-border bg-card lg:block">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[hsl(var(--nav-theme)/0.08)]">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold">Forza Horizon 6 Make</th>
                  <th className="px-5 py-4 text-sm font-semibold">Car</th>
                  <th className="px-5 py-4 text-sm font-semibold">Class</th>
                  <th className="px-5 py-4 text-sm font-semibold">Source Type</th>
                  <th className="px-5 py-4 text-sm font-semibold">Highlight</th>
                </tr>
              </thead>
              <tbody>
                {t.modules.forzaHorizon6CarList.items.map((item: any) => (
                  <tr key={`${item.make}-${item.car}`} className="border-t border-border align-top">
                    <td className="px-5 py-5 font-bold text-[hsl(var(--nav-theme-light))]">{item.make}</td>
                    <td className="px-5 py-5 font-semibold">{item.car}</td>
                    <td className="px-5 py-5">
                      <span className="inline-flex rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] px-3 py-1 text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                        {item.class}
                      </span>
                    </td>
                    <td className="px-5 py-5 text-sm text-muted-foreground">{item.sourceType}</td>
                    <td className="px-5 py-5 text-sm text-muted-foreground">{item.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
            {t.modules.forzaHorizon6CarList.items.map((item: any) => (
              <div key={`${item.make}-${item.car}`} className="rounded-lg border border-border bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-[hsl(var(--nav-theme-light))] mb-1">{item.make}</p>
                    <h3 className="text-xl font-bold leading-snug">{item.car}</h3>
                  </div>
                  <span className="rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] px-3 py-1 text-xs font-bold text-[hsl(var(--nav-theme-light))]">
                    {item.class}
                  </span>
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">{item.sourceType}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 10: Forza Horizon 6 JDM Cars and Customization */}
      <section id="forza-horizon-6-jdm-cars-and-customization" className="scroll-mt-24 px-4 py-20 bg-card/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Wrench className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[9].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6JdmCarsAndCustomization.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-4">
              {t.modules.forzaHorizon6JdmCarsAndCustomization.subtitle}
            </p>
            <p className="text-muted-foreground max-w-4xl mx-auto">
              {t.modules.forzaHorizon6JdmCarsAndCustomization.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {t.modules.forzaHorizon6JdmCarsAndCustomization.items.map((item: any, index: number) => (
              <div
                key={item.title}
                className={index === 0
                  ? 'rounded-lg border border-[hsl(var(--nav-theme)/0.45)] bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.7)] transition-colors md:col-span-2'
                  : 'rounded-lg border border-border bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors'}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))]">
                    {item.category}
                  </span>
                  <span className="text-sm font-bold text-[hsl(var(--nav-theme-light))]">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground mb-5">{item.description}</p>
                <div className="rounded-md border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.04)] p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--nav-theme-light))] mb-2">Best for</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 11: Forza Horizon 6 Trailer and Gameplay */}
      <section id="forza-horizon-6-trailer-and-gameplay" className="scroll-mt-24 px-4 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Video className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[10].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6TrailerAndGameplay.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-4">
              {t.modules.forzaHorizon6TrailerAndGameplay.subtitle}
            </p>
            <p className="text-muted-foreground max-w-4xl mx-auto">
              {t.modules.forzaHorizon6TrailerAndGameplay.intro}
            </p>
          </div>

          <div className="scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.forzaHorizon6TrailerAndGameplay.items.map((item: any, index: number) => (
              <div
                key={item.url}
                className={index === 0
                  ? 'rounded-lg border border-[hsl(var(--nav-theme)/0.45)] bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.7)] transition-colors md:col-span-2'
                  : 'rounded-lg border border-border bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors'}
              >
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] px-3 py-1 text-xs font-semibold text-[hsl(var(--nav-theme-light))] mb-4">
                      {item.videoType}
                    </span>
                    <h3 className="text-xl font-bold leading-snug">{item.title}</h3>
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 rounded-lg border border-[hsl(var(--nav-theme)/0.35)] px-4 py-2 text-sm font-semibold text-[hsl(var(--nav-theme-light))] hover:bg-[hsl(var(--nav-theme)/0.1)] transition-colors"
                  >
                    Watch
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-start gap-2 rounded-md border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.04)] px-4 py-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.watchReason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 12: Forza Horizon 6 Beginner Guide */}
      <section id="forza-horizon-6-beginner-guide" className="scroll-mt-24 px-4 py-20 bg-card/40">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12 scroll-reveal">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-5">
              <Route className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-sm font-medium">{t.tools.cards[11].title}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.modules.forzaHorizon6BeginnerGuide.title}
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-4">
              {t.modules.forzaHorizon6BeginnerGuide.subtitle}
            </p>
            <p className="text-muted-foreground max-w-4xl mx-auto">
              {t.modules.forzaHorizon6BeginnerGuide.intro}
            </p>
          </div>

          <div className="scroll-reveal relative space-y-5">
            <div className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-[hsl(var(--nav-theme)/0.3)] md:block" />
            {t.modules.forzaHorizon6BeginnerGuide.steps.map((step: any) => (
              <div key={step.step} className="relative flex gap-4 rounded-lg border border-border bg-card p-6 hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[hsl(var(--nav-theme)/0.5)] bg-background text-lg font-bold text-[hsl(var(--nav-theme-light))]">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">{step.description}</p>
                  <div className="flex items-start gap-2 rounded-md border border-[hsl(var(--nav-theme)/0.2)] bg-[hsl(var(--nav-theme)/0.04)] px-4 py-3">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--nav-theme-light))]" />
                    <p className="text-sm leading-relaxed text-muted-foreground">{step.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 广告位 6: 移动端横幅 320×50 */}
      <AdBanner type="banner-320x50" adKey={process.env.NEXT_PUBLIC_AD_MOBILE_320X50} />

      {/* FAQ Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection
          title={t.faq.title}
          titleHighlight={t.faq.titleHighlight}
          subtitle={t.faq.subtitle}
          questions={t.faq.questions}
        />
      </Suspense>

      {/* CTA Section */}
      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection
          title={t.cta.title}
          description={t.cta.description}
          joinCommunity={t.cta.joinCommunity}
          joinGame={t.cta.joinGame}
        />
      </Suspense>

      {/* Ad Banner 3 */}
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} />

      {/* Footer */}
      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">
                {t.footer.title}
              </h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>

            {/* Resources - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.resources}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://forza.net/forzahorizon6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.officialSite || 'Forza Horizon 6 Official Site'}
                  </a>
                </li>
                <li>
                  <a
                    href="https://store.steampowered.com/app/2483190/Forza_Horizon_6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamStore}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.xbox.com/en-US/games/forza-horizon-6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.xboxPage || 'Forza Horizon 6 on Xbox'}
                  </a>
                </li>
                <li>
                  <a
                    href="https://steamcommunity.com/app/2483190"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.steamCommunity}
                  </a>
                </li>
              </ul>
            </div>

            {/* Community - External Links Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://discord.com/invite/forza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.discord}
                  </a>
                </li>
                <li>
                  <a
                    href="https://forums.forza.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.twitter}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/r/ForzaHorizon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.reddit || 'r/ForzaHorizon'}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/watch?v=VXedKqX5Wa4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition"
                  >
                    {t.footer.youtubeTrailer || 'Official Teaser Trailer'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal - Internal Routes Only */}
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>{t.footer.about}</li>
                <li>{t.footer.privacy}</li>
                <li>{t.footer.terms}</li>
                <li>{t.footer.copyrightNotice}</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-6 mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
