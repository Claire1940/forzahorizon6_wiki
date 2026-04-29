import { getAllContent, CONTENT_TYPES } from '@/lib/content'
import type { Language, ContentItem } from '@/lib/content'

export interface ArticleLink {
  url: string
  title: string
}

export type ModuleLinkMap = Record<string, ArticleLink | null>

interface ArticleWithType extends ContentItem {
  contentType: string
}

// Module sub-field mapping: moduleKey -> { field, nameKey }
const MODULE_FIELDS: Record<string, { field: string; nameKey: string }> = {
  forzaHorizon6ReleaseDate: { field: 'items', nameKey: 'label' },
  forzaHorizon6SteamPreOrder: { field: 'steps', nameKey: 'title' },
  forzaHorizon6EditionsAndPrice: { field: 'items', nameKey: 'edition' },
  forzaHorizon6GamePass: { field: 'items', nameKey: 'label' },
  forzaHorizon6Ps5Release: { field: 'items', nameKey: 'question' },
  forzaHorizon6SystemRequirements: { field: 'items', nameKey: 'spec' },
  forzaHorizon6JapanMap: { field: 'items', nameKey: 'question' },
  forzaHorizon6TokyoCity: { field: 'items', nameKey: 'title' },
  forzaHorizon6CarList: { field: 'items', nameKey: 'car' },
  forzaHorizon6JdmCarsAndCustomization: { field: 'items', nameKey: 'title' },
  forzaHorizon6TrailerAndGameplay: { field: 'items', nameKey: 'title' },
  forzaHorizon6BeginnerGuide: { field: 'steps', nameKey: 'title' },
  forzaHorizon6TougeBattlesAndTimeAttack: { field: 'items', nameKey: 'title' },
  forzaHorizon6MultiplayerAndCrossSave: { field: 'items', nameKey: 'title' },
  forzaHorizon6TreasureCarsAndCollectionJournal: { field: 'steps', nameKey: 'title' },
  forzaHorizon6Achievements: { field: 'items', nameKey: 'title' },
}

// Extra semantic keywords per module to boost matching for h2 titles
// These supplement the module title text when matching against articles
const MODULE_EXTRA_KEYWORDS: Record<string, string[]> = {
  forzaHorizon6ReleaseDate: ['launch date', 'early access', 'steam unlock', 'game pass', 'ps5 release', 'may 19'],
  forzaHorizon6SteamPreOrder: ['steam', 'pre order', 'advanced access', 'ferrari j50', 'premium edition', 'pc requirements'],
  forzaHorizon6EditionsAndPrice: ['standard edition', 'deluxe edition', 'premium edition', 'premium upgrade', 'car pass', 'vip membership'],
  forzaHorizon6GamePass: ['game pass', 'pc game pass', 'ultimate', 'premium upgrade', 'xbox play anywhere', 'cloud gaming'],
  forzaHorizon6Ps5Release: ['ps5', 'playstation 5', 'cross save', 'wishlist', 'dlc purchases', 'later 2026'],
  forzaHorizon6SystemRequirements: ['pc specs', 'windows 10 22h2', 'directx 12', 'ssd', 'dlss', 'benchmark'],
  forzaHorizon6JapanMap: ['japan map', 'tokyo city', 'japanese alps', 'c1 loop', 'gingko avenue', 'mt haruna'],
  forzaHorizon6TokyoCity: ['tokyo city', 'urban area', 'daikoku', 'car meets', 'vertical roads', 'industrial districts'],
  forzaHorizon6CarList: ['confirmed cars', 'car list', 'gr gt prototype', 'car classes', 'cover cars', 'car pass'],
  forzaHorizon6JdmCarsAndCustomization: ['jdm cars', 'body kits', 'forza aero', 'liveries', 'engine swaps', 'japanese car culture'],
  forzaHorizon6TrailerAndGameplay: ['trailer', 'gameplay', 'tokyo game show', 'official videos', 'reveal trailer', 'horizon japan'],
  forzaHorizon6BeginnerGuide: ['beginner guide', 'tourist start', 'wristbands', 'collection journal', 'legend island', 'horizon invitational'],
  forzaHorizon6TougeBattlesAndTimeAttack: ['touge battles', 'time attack', 'drag meets', 'street races', 'mountain passes', 'spec racing'],
  forzaHorizon6MultiplayerAndCrossSave: ['multiplayer', 'cross save', 'cross play', 'car meets', 'convoys', 'link skills'],
  forzaHorizon6TreasureCarsAndCollectionJournal: ['treasure cars', 'collection journal', 'barn finds', 'stamps', 'aftermarket cars', 'mascots'],
  forzaHorizon6Achievements: ['achievements', 'gamerscore', 'wristbands', 'stamps', 'treasure cars', 'horizon legend'],
}

const FILLER_WORDS = ['forza', 'horizon', '6', '2026', '2025', 'complete', 'the', 'and', 'for', 'how', 'with', 'our', 'this', 'your', 'all', 'from', 'learn', 'master']

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getSignificantTokens(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter(w => w.length > 2 && !FILLER_WORDS.includes(w))
}

function matchScore(queryText: string, article: ArticleWithType, extraKeywords?: string[]): number {
  const normalizedQuery = normalize(queryText)
  const normalizedTitle = normalize(article.frontmatter.title)
  const normalizedDesc = normalize(article.frontmatter.description || '')
  const normalizedSlug = article.slug.replace(/-/g, ' ').toLowerCase()

  let score = 0

  // Exact phrase match in title (stripped of "Forza Horizon 6")
  const strippedQuery = normalizedQuery.replace(/forza horizon 6\s*/g, '').trim()
  const strippedTitle = normalizedTitle.replace(/forza horizon 6\s*/g, '').trim()
  if (strippedQuery.length > 3 && strippedTitle.includes(strippedQuery)) {
    score += 100
  }

  // Token overlap from query text
  const queryTokens = getSignificantTokens(queryText)
  for (const token of queryTokens) {
    if (normalizedTitle.includes(token)) score += 20
    if (normalizedDesc.includes(token)) score += 5
    if (normalizedSlug.includes(token)) score += 15
  }

  // Extra keywords scoring (for module h2 titles)
  if (extraKeywords) {
    for (const kw of extraKeywords) {
      const normalizedKw = normalize(kw)
      if (normalizedTitle.includes(normalizedKw)) score += 15
      if (normalizedDesc.includes(normalizedKw)) score += 5
      if (normalizedSlug.includes(normalizedKw)) score += 10
    }
  }

  return score
}

function findBestMatch(
  queryText: string,
  articles: ArticleWithType[],
  extraKeywords?: string[],
  threshold = 20,
  pathPrefix = '',
): ArticleLink | null {
  let bestScore = 0
  let bestArticle: ArticleWithType | null = null

  for (const article of articles) {
    const score = matchScore(queryText, article, extraKeywords)
    if (score > bestScore) {
      bestScore = score
      bestArticle = article
    }
  }

  if (bestScore >= threshold && bestArticle) {
    return {
      url: `${pathPrefix}/${bestArticle.contentType}/${bestArticle.slug}`,
      title: bestArticle.frontmatter.title,
    }
  }

  return null
}

export async function buildModuleLinkMap(locale: Language): Promise<ModuleLinkMap> {
  const pathPrefix = locale === 'en' ? '' : `/${locale}`

  // 1. Load all articles across all content types
  const allArticles: ArticleWithType[] = []
  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, locale)
    for (const item of items) {
      allArticles.push({ ...item, contentType })
    }
  }

  // 2. Load module data from en.json (use English for keyword matching)
  const enMessages = (await import('../locales/en.json')).default as any

  const linkMap: ModuleLinkMap = {}

  // 3. For each module, match h2 title and sub-items
  for (const [moduleKey, fieldConfig] of Object.entries(MODULE_FIELDS)) {
    const moduleData = enMessages.modules?.[moduleKey]
    if (!moduleData) continue

    // Match module h2 title (use extra keywords + lower threshold for broader matching)
    const moduleTitle = moduleData.title as string
    if (moduleTitle) {
      const extraKw = MODULE_EXTRA_KEYWORDS[moduleKey] || []
      linkMap[moduleKey] = findBestMatch(moduleTitle, allArticles, extraKw, 15, pathPrefix)
    }

    // Match sub-items
    const subItems = moduleData[fieldConfig.field] as any[]
    if (Array.isArray(subItems)) {
      for (let i = 0; i < subItems.length; i++) {
        const itemName = subItems[i]?.[fieldConfig.nameKey] as string
        if (itemName) {
          const key = `${moduleKey}::${fieldConfig.field}::${i}`
          linkMap[key] = findBestMatch(itemName, allArticles, undefined, 20, pathPrefix)
        }
      }
    }
  }

  return linkMap
}
