export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  USDT: '/usdt',
  USDC: '/usdc',
  DOCS: '/docs',
} as const

export type RoutesType = keyof typeof ROUTES
