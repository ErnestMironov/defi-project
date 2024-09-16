export const ROUTES = {
  DEPOSIT: '/',
  PORTFOLIO: '/portfolio',
  ANALYTICS: '/analytics',
  TOKENS: '/analytics/tokens',
  TOKEN: '/analytics/tokens/:symbol',
  STRATEGIES: '/analytics/strategies',
  TRANSACTIONS: '/analytics/transactions',
  TRANSACTION: '/analytics/transactions/:tx_hash',
  STRATEGY: '/analytics/strategies/:id',
  OTP: '/otp',
} as const

export type RoutesType = keyof typeof ROUTES
