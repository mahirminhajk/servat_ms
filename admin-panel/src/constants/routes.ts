export const ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    PRIVACY_POLICY: '/privacy-policy',
    DASHBOARD: '/',
    SERVICES: '/services',
    CUSTOMERS: '/customers',
    BOOKING: '/booking',
    SETTINGS: '/settings',
    PROFILE: (id: string) => `/profile/${id}`,
} as const;

//TODO: add privacy policy page
