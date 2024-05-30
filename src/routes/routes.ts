export const ROUTES = {
  HOME: '/',
} as const

export type RoutesType = keyof typeof ROUTES
