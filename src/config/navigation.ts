import {
	BadgeDollarSign,
	CalendarDays,
	CarFront,
	Clapperboard,
	Cpu,
	Gamepad2,
	MapPinned,
	type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'codes' -> t('nav.codes')
	path: string // URL 路径，如 '/codes'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'release', path: '/release', icon: CalendarDays, isContentType: true },
	{ key: 'platforms', path: '/platforms', icon: Gamepad2, isContentType: true },
	{ key: 'map', path: '/map', icon: MapPinned, isContentType: true },
	{ key: 'cars', path: '/cars', icon: CarFront, isContentType: true },
	{ key: 'editions', path: '/editions', icon: BadgeDollarSign, isContentType: true },
	{ key: 'specs', path: '/specs', icon: Cpu, isContentType: true },
	{ key: 'media', path: '/media', icon: Clapperboard, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['release', 'platforms', 'map', 'cars', 'editions', 'specs', 'media']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
