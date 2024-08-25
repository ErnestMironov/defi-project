export const ROUTES = {
  DEPOSIT: '/',
  ANALYTICS: '/analytics',
  TOKENS: '/tokens',
  TOKEN: '/tokens/:symbol',
  STRATEGIES: '/strategies',
  TRANSACTIONS: '/transactions',
  TRANSACTION: '/transactions/:txHash',
  STRATEGY: '/strategies/:id',
} as const

export type RoutesType = keyof typeof ROUTES
