export const USE_MOCKS = (() => {
  const flag = import.meta.env.VITE_USE_MOCKS
  if (flag === 'false') return false
  if (flag === 'true') return true
  return true
})()

export const MOCK_LATENCY_MS = (() => {
  const value = Number(import.meta.env.VITE_MOCK_LATENCY_MS)
  return Number.isFinite(value) ? value : 150
})()

export const MOCK_SWAP_LATENCY_MS = (() => {
  const value = Number(import.meta.env.VITE_MOCK_SWAP_LATENCY_MS)
  return Number.isFinite(value) ? value : 1200
})()
