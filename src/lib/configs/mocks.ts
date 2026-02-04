export const USE_MOCKS = (() => {
  const flag = import.meta.env.VITE_USE_MOCKS
  if (flag === 'true') return true
  if (flag === 'false') return false
  return import.meta.env.DEV
})()

export const MOCK_LATENCY_MS = (() => {
  const value = Number(import.meta.env.VITE_MOCK_LATENCY_MS)
  return Number.isFinite(value) ? value : 150
})()
