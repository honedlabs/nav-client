import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useNav, type NavItem } from '../src/index'

vi.mock('@inertiajs/vue3', () => ({
    usePage: vi.fn(() => ({
        props: {
            nav: [
                {
                    name: 'Home',
                    url: '/',
                    isActive: true
                },
                {
                    name: 'About',
                    url: '/about',
                    isActive: false
                }
            ],
            icons: [
                {
                    name: 'Dashboard',
                    url: '/dashboard',
                    isActive: true,
                    icon: 'dashboard-icon'
                },
                {
                    name: 'Settings',
                    url: '/settings',
                    isActive: false,
                    icon: 'settings-icon'
                }
            ]
        }
    }))
}))

describe('useNav', () => {
    const nav: NavItem[] = [
        {
            name: 'Home',
            url: '/',
            isActive: true
        },
        {
            name: 'About',
            url: '/about',
            isActive: false
        }
    ]

    const icons: NavItem<true>[] = [
        {
            name: 'Dashboard',
            url: '/dashboard',
            isActive: true,
            icon: 'dashboard-icon'
        },
        {
            name: 'Settings',
            url: '/settings',
            isActive: false,
            icon: 'settings-icon'
        }
    ]

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return nav items from default "nav" key', () => {
        const items = useNav()
        expect(items.value).toEqual(nav)
    })

    it('should return nav items from custom key', () => {
        const items = useNav('icons')
        expect(items.value).toEqual(icons)
    })

    it('should handle nav items with required icons', () => {
        const items = useNav<true>('icons')
        expect(items.value).toEqual(icons)
        expect(items.value[0].icon).toBeDefined()
    })

    it('should return undefined when props is undefined', () => {
        const items = useNav('missing')
        expect(items.value).toBeUndefined()
    })
})
