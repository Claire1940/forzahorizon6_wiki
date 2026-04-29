import type { ContentFrontmatter, ContentType } from '@/lib/content'

interface ArticleStructuredDataProps {
	frontmatter: ContentFrontmatter
	contentType: ContentType
	locale: string
	slug: string
}

export function ArticleStructuredData({
	frontmatter,
	contentType,
	locale,
	slug,
}: ArticleStructuredDataProps) {
	const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://forzahorizon6.wiki').replace(/\/$/, '')
	const articleUrl =
		locale === 'en'
			? `${siteUrl}/${contentType}/${slug}`
			: `${siteUrl}/${locale}/${contentType}/${slug}`
	const articleImage = frontmatter.image ? new URL(frontmatter.image, siteUrl).toString() : new URL('/images/hero.webp', siteUrl).toString()

	const breadcrumbData = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: siteUrl,
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: contentType.charAt(0).toUpperCase() + contentType.slice(1),
				item: `${siteUrl}/${contentType}`,
			},
			{
				'@type': 'ListItem',
				position: 3,
				name: frontmatter.title,
				item: articleUrl,
			},
		],
	}

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: frontmatter.title,
		description: frontmatter.description,
		image: articleImage,
		datePublished: frontmatter.date,
		dateModified: ('lastModified' in frontmatter && frontmatter.lastModified) || frontmatter.date,
		author: {
			'@type': 'Organization',
			name: 'Forza Horizon 6 Wiki Team',
		},
		publisher: {
			'@type': 'Organization',
			name: 'Forza Horizon 6',
			url: siteUrl,
			logo: {
				'@type': 'ImageObject',
				url: new URL('/android-chrome-512x512.png', siteUrl).toString(),
				width: 512,
				height: 512,
			},
		},
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': articleUrl,
		},
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
			/>
		</>
	)
}
