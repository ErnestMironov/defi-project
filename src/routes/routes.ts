export const ROUTES = {
  ANALYTICS: '/analytics',
  DEPOSIT: '/',
} as const

export type RoutesType = keyof typeof ROUTES
