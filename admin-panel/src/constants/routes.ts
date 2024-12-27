export const ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    PRIVACY_POLICY: '/privacy-policy',
    DASHBOARD: '/',
    PROFILE: (id: string) => `/profile/${id}`,
} as const;