export const ROUTES = {
  DEPOSIT: '/',
  ANALYTICS: '/analytics',
  TOKENS: '/analytics/tokens',
  TOKEN: '/analytics/tokens/:symbol',
  STRATEGIES: '/analytics/strategies',
  TRANSACTIONS: '/analytics/transactions',
  TRANSACTION: '/analytics/transactions/:txHash',
  STRATEGY: '/analytics/strategies/:id',
} as const

export type RoutesType = keyof typeof ROUTES
