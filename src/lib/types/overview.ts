export interface IOverview {
  userOverview: {
    deposited: number | string
    monthlyYield: number | string
    averageAPY: number | string
  }
  maatOverview: {
    tvl: number | string
    cumulativeEarnings: number | string
    strategies: number | string
  }
}
