export const ROUTES = {
  DEPOSIT: '/',
  ANALYTICS: '/analytics',
  TOKENS: '/tokens',
  STRATEGIES: '/strategies',
  TRANSACTIONS: '/transactions',
} as const

export type RoutesType = keyof typeof ROUTES
