import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useNav, type NavItem } from '../src/index'
import { usePage } from '@inertiajs/vue3'

// Mock the @inertiajs/vue3 module
vi.mock('@inertiajs/vue3', () => ({
    usePage: vi.fn()
}))

describe('useNav', () => {
    // Setup mock data
    const mockNavItems: NavItem[] = [
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

    const mockNavItemsWithIcons: NavItem<true>[] = [
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
        // Reset all mocks before each test
        vi.clearAllMocks()
    })

    it('should return nav items from default "nav" key', () => {
        // Mock the usePage implementation
        vi.mocked(usePage).mockReturnValue({
            props: {
                nav: mockNavItems
            }
        } as any)

        const nav = useNav()
        expect(nav.value).toEqual(mockNavItems)
    })

    it('should return nav items from custom key', () => {
        // Mock the usePage implementation with a custom key
        vi.mocked(usePage).mockReturnValue({
            props: {
                customNav: mockNavItems
            }
        } as any)

        const nav = useNav('customNav')
        expect(nav.value).toEqual(mockNavItems)
    })

    it('should handle nav items with required icons', () => {
        vi.mocked(usePage).mockReturnValue({
            props: {
                nav: mockNavItemsWithIcons
            }
        } as any)

        const nav = useNav<true>()
        expect(nav.value).toEqual(mockNavItemsWithIcons)
        // Type check: ensure icon is required
        expect(nav.value[0].icon).toBeDefined()
    })

    it('should return undefined when props is undefined', () => {
        vi.mocked(usePage).mockReturnValue({} as any)

        const nav = useNav()
        expect(nav.value).toBeUndefined()
    })

    it('should return undefined when nav key is not found', () => {
        vi.mocked(usePage).mockReturnValue({
            props: {}
        } as any)

        const nav = useNav()
        expect(nav.value).toBeUndefined()
    })
})

