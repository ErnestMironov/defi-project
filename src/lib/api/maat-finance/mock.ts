import type { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from 'axios'

import { MOCK_LATENCY_MS } from '@configs/mocks'
import type {
  AdminEvent,
  Event,
  IncentiveEvent,
  PaginationResponse,
  RebalanceVolume,
  ReportType,
  Strategy,
  VaultType,
} from './types'

type ProtocolMetrics = {
  history: {
    [currency: string]: {
      apy: number
      tvl: number
      timestamps: {
        [timestamp: string]: {
          apy: number
          tvl: number
          chain: string
          protocol: string
          token: string
          token_stats: null
          strategy_id: string
        }
      }
    }
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const nowIso = new Date().toISOString()
const dayMs = 86_400_000

const buildTimestamps = (days: number) => {
  const stamps: string[] = []
  for (let i = days - 1; i >= 0; i -= 1) {
    stamps.push(new Date(Date.now() - i * dayMs).toISOString())
  }
  return stamps
}

const chartTimestamps = buildTimestamps(7)

const mockTokenUSDC = {
  address: '0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  chain_id: 42161,
  decimals: 6,
  name: 'USD Coin',
  symbol: 'USDC',
}

const mockTokenUSDT = {
  address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  chain_id: 42161,
  decimals: 6,
  name: 'Tether USD',
  symbol: 'USDT',
}

const mockVaultUSDC: VaultType = {
  address: '0x1111111111111111111111111111111111111111',
  chain_id: 42161,
  token: mockTokenUSDC,
}

const mockVaultUSDT: VaultType = {
  address: '0x2222222222222222222222222222222222222222',
  chain_id: 42161,
  token: mockTokenUSDT,
}

const mockStrategyA: Strategy = {
  id: 'strat-001',
  address: '0x3333333333333333333333333333333333333333',
  chain_id: 42161,
  protocol: 'Aave',
  tvl: 1_250_000,
  apy: 7.8,
  token: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    address: mockTokenUSDC.address,
    chain_id: 42161,
  },
  connected_to_vaults: null,
  info: {
    name: 'USDC Core',
    strategy_id: 'strat-001',
    strategy_description: 'Mock strategy for local UI.',
    protocol: {
      name: 'Aave',
      description: 'Mock Aave strategy',
      link: 'https://aave.com',
    },
  },
}

const mockStrategyB: Strategy = {
  id: 'strat-002',
  address: '0x4444444444444444444444444444444444444444',
  chain_id: 137,
  protocol: 'Compound',
  tvl: 830_000,
  apy: 6.2,
  token: {
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    address: mockTokenUSDT.address,
    chain_id: 137,
  },
  connected_to_vaults: null,
  info: {
    name: 'USDT Yield',
    strategy_id: 'strat-002',
    strategy_description: 'Mock strategy for local UI.',
    protocol: {
      name: 'Compound',
      description: 'Mock Compound strategy',
      link: 'https://compound.finance',
    },
  },
}

const mockStrategyC: Strategy = {
  id: 'strat-003',
  address: '0x5555555555555555555555555555555555555555',
  chain_id: 10,
  protocol: 'Aave',
  tvl: 540_000,
  apy: 5.4,
  token: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
    address: mockTokenUSDC.address,
    chain_id: 10,
  },
  connected_to_vaults: null,
  info: {
    name: 'USDC Optimism',
    strategy_id: 'strat-003',
    strategy_description: 'Mock strategy for local UI.',
    protocol: {
      name: 'Aave',
      description: 'Mock Aave strategy',
      link: 'https://aave.com',
    },
  },
}

const mockStrategyD: Strategy = {
  id: 'strat-004',
  address: '0x6666666666666666666666666666666666666666',
  chain_id: 8453,
  protocol: 'Compound',
  tvl: 420_000,
  apy: 4.9,
  token: {
    name: 'Tether USD',
    symbol: 'USDT',
    decimals: 6,
    address: mockTokenUSDT.address,
    chain_id: 8453,
  },
  connected_to_vaults: null,
  info: {
    name: 'USDT Base',
    strategy_id: 'strat-004',
    strategy_description: 'Mock strategy for local UI.',
    protocol: {
      name: 'Compound',
      description: 'Mock Compound strategy',
      link: 'https://compound.finance',
    },
  },
}

const mockEvent: Event = {
  hash: '0xaaaa111111111111111111111111111111111111111111111111111111111111',
  intention_id: '0xbbbb111111111111111111111111111111111111111111111111111111111111',
  status: 'success',
  src_chain_id: 42161,
  dst_chain_id: null,
  creation_time: nowIso,
  txFrom: '0x5555555555555555555555555555555555555555',
  to: '0x6666666666666666666666666666666666666666',
  action_type: 'DEPOSIT',
  amount: 2_500_000_000,
  volume: 2_500_000_000,
  vault: mockVaultUSDC,
}

const actionTypes: Array<Event['action_type']> = [
  'DEPOSIT',
  'WITHDRAW_REQUEST',
  'WITHDRAW_FULFILLMENT',
  'BRIDGE',
  'REBALANCE_REQUEST',
]

const mockEvents: Event[] = Array.from({ length: 50 }).map((_, index) => {
  const isEven = index % 2 === 0
  const amount = (500 + index * 35) * 1_000_000
  return {
    ...mockEvent,
    hash: `0xaaaa1111111111111111111111111111111111111111111111111111111111${String(
      index,
    ).padStart(2, '0')}`,
    action_type: actionTypes[index % actionTypes.length],
    amount,
    volume: amount,
    vault: isEven ? mockVaultUSDC : mockVaultUSDT,
    creation_time: new Date(Date.now() - index * 3_600_000).toISOString(),
  }
})

const mockIncentiveEvent: IncentiveEvent = {
  hash: '0xaaaa222222222222222222222222222222222222222222222222222222222222',
  intention_id: null,
  status: 'success',
  src_chain_id: 42161,
  dst_chain_id: null,
  creation_time: nowIso,
  txFrom: '0x7777777777777777777777777777777777777777',
  to: '0x8888888888888888888888888888888888888888',
  action_type: 'INC_HARVEST',
  amount_in: 1200,
  token_in: mockTokenUSDC,
  token_out: null,
  amount_out: null,
  strategy: mockStrategyA,
  reward_token: null,
  entity_initializer: 'system',
}

const mockIncentiveEvents: IncentiveEvent[] = [
  mockIncentiveEvent,
  {
    ...mockIncentiveEvent,
    hash: '0xaaaa222222222222222222222222222222222222222222222222222222222223',
    action_type: 'INC_SWAP',
    amount_in: 900,
    strategy: mockStrategyB,
  },
  {
    ...mockIncentiveEvent,
    hash: '0xaaaa222222222222222222222222222222222222222222222222222222222224',
    action_type: 'INC_COMPOUND',
    amount_in: 650,
    strategy: mockStrategyC,
  },
]

const mockAdminEvent: AdminEvent = {
  hash: '0xaaaa333333333333333333333333333333333333333333333333333333333333',
  intention_id: null,
  status: 'success',
  src_chain_id: 42161,
  dst_chain_id: null,
  creation_time: nowIso,
  txFrom: '0x9999999999999999999999999999999999999999',
  to: '0x0000000000000000000000000000000000000001',
  action_type: 'STRATEGY_REGISTERED',
  arguments: {
    strategyId: mockStrategyA.id,
  },
}

const mockAdminEvents: AdminEvent[] = [
  mockAdminEvent,
  {
    ...mockAdminEvent,
    hash: '0xaaaa333333333333333333333333333333333333333333333333333333333334',
    action_type: 'VAULT_REGISTERED',
    arguments: {},
  },
  {
    ...mockAdminEvent,
    hash: '0xaaaa333333333333333333333333333333333333333333333333333333333335',
    action_type: 'FEE_CHANGED',
    arguments: {},
  },
]

const mockReport: ReportType = {
  hash: '0xaaaa444444444444444444444444444444444444444444444444444444444444',
  intention_id: null,
  status: 'success',
  src_chain_id: 42161,
  dst_chain_id: null,
  creation_time: nowIso,
  txFrom: '0x0000000000000000000000000000000000000002',
  to: '0x0000000000000000000000000000000000000003',
  action_type: 'UPDATE_PPS',
  price_per_share: 1.02,
  vault: {
    address: mockVaultUSDC.address,
    chain_id: mockVaultUSDC.chain_id,
    token: mockTokenUSDC,
  },
}

const mockReports: ReportType[] = [
  mockReport,
  {
    ...mockReport,
    hash: '0xaaaa444444444444444444444444444444444444444444444444444444444445',
    price_per_share: 1.05,
    vault: {
      address: mockVaultUSDT.address,
      chain_id: mockVaultUSDT.chain_id,
      token: mockTokenUSDT,
    },
  },
  {
    ...mockReport,
    hash: '0xaaaa444444444444444444444444444444444444444444444444444444444446',
    price_per_share: 0.98,
    vault: {
      address: mockVaultUSDC.address,
      chain_id: mockVaultUSDC.chain_id,
      token: mockTokenUSDC,
    },
  },
]

const mockRebalanceVolume: RebalanceVolume = {
  USDC: 120_000,
  USDT: 80_000,
}

const mockProtocolMetrics: ProtocolMetrics = {
  history: {
    maat: {
      apy: 7.1,
      tvl: 2_080_000,
      timestamps: Object.fromEntries(
        chartTimestamps.map((stamp, index) => [
          stamp,
          {
            apy: 6.6 + index * 0.1,
            tvl: 1_900_000 + index * 40_000,
            chain: 'arbitrum',
            protocol: 'Aave',
            token: 'USDC',
            token_stats: null,
            strategy_id: mockStrategyA.id,
          },
        ]),
      ),
    },
    USDC: {
      apy: 7.4,
      tvl: 1_250_000,
      timestamps: Object.fromEntries(
        chartTimestamps.map((stamp, index) => [
          stamp,
          {
            apy: 7.0 + index * 0.08,
            tvl: 1_100_000 + index * 25_000,
            chain: 'arbitrum',
            protocol: 'Aave',
            token: 'USDC',
            token_stats: null,
            strategy_id: mockStrategyA.id,
          },
        ]),
      ),
    },
    USDT: {
      apy: 6.2,
      tvl: 830_000,
      timestamps: Object.fromEntries(
        chartTimestamps.map((stamp, index) => [
          stamp,
          {
            apy: 5.8 + index * 0.06,
            tvl: 760_000 + index * 18_000,
            chain: 'polygon',
            protocol: 'Compound',
            token: 'USDT',
            token_stats: null,
            strategy_id: mockStrategyB.id,
          },
        ]),
      ),
    },
  },
}

const mockStrategiesMetrics = Object.fromEntries(
  chartTimestamps.map((stamp, index) => [
    stamp,
    {
      [mockStrategyA.id]: {
        strategy_id: mockStrategyA.id,
        token: 'USDC',
        protocol: 'Aave',
        chain: null,
        apy: 7.0 + index * 0.08,
        tvl: 1_100_000 + index * 25_000,
        tokens_stats: null,
      },
      [mockStrategyB.id]: {
        strategy_id: mockStrategyB.id,
        token: 'USDT',
        protocol: 'Compound',
        chain: null,
        apy: 5.8 + index * 0.06,
        tvl: 760_000 + index * 18_000,
        tokens_stats: null,
      },
      [mockStrategyC.id]: {
        strategy_id: mockStrategyC.id,
        token: 'USDC',
        protocol: 'Aave',
        chain: null,
        apy: 5.0 + index * 0.05,
        tvl: 480_000 + index * 12_000,
        tokens_stats: null,
      },
      [mockStrategyD.id]: {
        strategy_id: mockStrategyD.id,
        token: 'USDT',
        protocol: 'Compound',
        chain: null,
        apy: 4.6 + index * 0.04,
        tvl: 360_000 + index * 10_000,
        tokens_stats: null,
      },
    },
  ]),
)

const mockPagination = <T>(items: T[], page = 1, size = items.length): PaginationResponse<T> => ({
  items,
  total: items.length,
  page,
  size,
  total_items: items.length,
  total_pages: 1,
})

const jsonResponse = <T>(config: AxiosRequestConfig, data: T, status = 200): AxiosResponse<T> => ({
  data,
  status,
  statusText: 'OK',
  headers: {},
  config: config as AxiosResponse<T>['config'],
})

const normalizeUrl = (config: AxiosRequestConfig) => {
  const url = config.url ?? ''
  return url.replace(/^\//, '')
}

export const createMaatMockAdapter = (): AxiosAdapter => {
  return async (config) => {
    const url = normalizeUrl(config)

    if (MOCK_LATENCY_MS > 0) {
      await sleep(MOCK_LATENCY_MS)
    }

    if (url.startsWith('analytics/overview/strategies/')) {
      return jsonResponse(config, mockStrategyA)
    }

    if (url === 'analytics/overview/strategies') {
      return jsonResponse(
        config,
        mockPagination([mockStrategyA, mockStrategyB, mockStrategyC, mockStrategyD]),
      )
    }

    if (url === 'analytics/stats/vaults') {
      return jsonResponse(config, [mockVaultUSDC, mockVaultUSDT])
    }

    if (url === 'analytics/actions/last/rebalances') {
      return jsonResponse(config, {
        USDC: mockEvents,
        USDT: mockEvents,
      })
    }

    if (url === 'analytics/actions/last') {
      return jsonResponse(config, mockPagination(mockEvents))
    }

    if (url === 'analytics/actions/admin') {
      return jsonResponse(config, mockPagination(mockAdminEvents))
    }

    if (url === 'analytics/actions/incentives') {
      return jsonResponse(config, mockPagination(mockIncentiveEvents))
    }

    if (url === 'analytics/actions/oracle') {
      return jsonResponse(config, mockPagination(mockReports))
    }

    if (url === 'analytics/actions/related') {
      return jsonResponse(config, [
        {
          hash: mockEvent.hash,
          intention_id: mockEvent.intention_id,
          status: mockEvent.status,
          src_chain_id: mockEvent.src_chain_id,
          dst_chain_id: mockEvent.dst_chain_id,
          creation_time: mockEvent.creation_time,
          txFrom: mockEvent.txFrom,
          to: mockEvent.to,
          amount: mockEvent.amount ?? 0,
          action_type: 'DEPOSIT',
          strategy: mockStrategyA,
          vault: mockVaultUSDC,
        },
        {
          hash: mockEvents[1].hash,
          intention_id: mockEvents[1].intention_id,
          status: mockEvents[1].status,
          src_chain_id: mockEvents[1].src_chain_id,
          dst_chain_id: mockEvents[1].dst_chain_id,
          creation_time: mockEvents[1].creation_time,
          txFrom: mockEvents[1].txFrom,
          to: mockEvents[1].to,
          amount: mockEvents[1].amount ?? 0,
          action_type: 'WITHDRAW_REQUEST',
          strategy: mockStrategyB,
          vault: mockVaultUSDT,
        },
      ])
    }

    if (url === 'analytics/stats/rebalance-volume') {
      return jsonResponse(config, mockRebalanceVolume)
    }

    if (url.startsWith('analytics/portfolio/assets/yield/')) {
      return jsonResponse(config, { USDC: 7.4, USDT: 6.1 })
    }

    if (url.startsWith('analytics/portfolio/assets/')) {
      return jsonResponse(config, { USDC: 2_500, USDT: 1_200 })
    }

    if (url.startsWith('analytics/portfolio/transactions/')) {
      return jsonResponse(config, mockEvents)
    }

    if (url === 'analytics/stats/strategies/metrics') {
      return jsonResponse(config, mockStrategiesMetrics)
    }

    if (url === 'analytics/overview/strategies/metrics') {
      return jsonResponse(
        config,
        mockPagination([mockStrategyA, mockStrategyB, mockStrategyC, mockStrategyD]),
      )
    }

    if (url === 'analytics/stats/protocol/metrics') {
      return jsonResponse(config, mockProtocolMetrics)
    }

    if (url === 'analytics/users/unique-users') {
      return jsonResponse(config, {
        unique_users: {
          all: 1240,
        },
        total_users: 1240,
      })
    }

    if (url === 'analytics/user/chain-ids-to-withdraw') {
      return jsonResponse(config, {
        USDT: [42161, 137, 8453],
        USDC: [42161, 137, 8453],
      })
    }

    if (url === 'analytics/actions/status') {
      return jsonResponse(config, 'success')
    }

    if (url.startsWith('rewards/info/user/')) {
      return jsonResponse(config, {
        address: url.split('/').pop() ?? '0x',
        totalRewards: 1245,
        currentRewardMultiplier: 1.2,
        rewardsPerStaking: 420,
        rewardsPerActivity: 110,
      })
    }

    if (url.startsWith('rewards/rewards/leaderboard')) {
      return jsonResponse(config, {
        items: [
          {
            address: '0x5555555555555555555555555555555555555555',
            totalRewards: 5400,
            currentRewardMultiplier: 1.4,
            rewardsPerStaking: 1500,
            rewardsPerActivity: 300,
          },
          {
            address: '0x6666666666666666666666666666666666666666',
            totalRewards: 4200,
            currentRewardMultiplier: 1.2,
            rewardsPerStaking: 1200,
            rewardsPerActivity: 240,
          },
        ],
        page: 1,
        size: 10,
        total_items: 2,
        total_pages: 1,
      })
    }

    if (url.startsWith('rewards/user/badges/info')) {
      return jsonResponse(config, {
        currentLvl: {
          name: 'Bronze',
          description: 'Starter level',
          level: 1,
          benefits: {
            globalRewardMultiplier: 1.05,
            rewardsPerActivity: 10,
            currentRewardMultiplier: 1.1,
            initialBonus: 25,
            firstTimeStakeBonus: 50,
            rewardsFromReferrals: 5,
            benefitsDescription: {
              level: 1,
              ref_codes: 1,
              nft_bonus: null,
              other_benefits: null,
              incentives: null,
            },
          },
        },
        userRewards: {
          userId: '0x5555555555555555555555555555555555555555',
          totalPoints: 1245,
          rewardsPerStaking: 420,
          currentRewardMultiplier: 1.1,
          initialBonus: 25,
          firstTimeStakeBonus: 50,
          rewardsFromReferrals: 5,
        },
        nextLvl: {
          name: 'Silver',
          description: 'Next level',
          pointsToNextLevel: 800,
          requirementsCompletedPercentage: 40,
          nextLvlBenefits: {
            globalRewardMultiplier: 1.1,
            rewardsPerActivity: 15,
            currentRewardMultiplier: 1.2,
            initialBonus: 50,
            firstTimeStakeBonus: 80,
            rewardsFromReferrals: 8,
            benefitsDescription: {
              level: 2,
              ref_codes: 2,
              nft_bonus: null,
              other_benefits: null,
              incentives: null,
            },
          },
        },
      })
    }

    return jsonResponse(config, {})
  }
}

export const createReferralMockAdapter = (): AxiosAdapter => {
  return async (config) => {
    const url = normalizeUrl(config)

    if (MOCK_LATENCY_MS > 0) {
      await sleep(MOCK_LATENCY_MS)
    }

    if (url === 'message-to-sign') {
      return jsonResponse(config, { message: 'Mock sign-in for local development.' })
    }

    if (url.startsWith('is-registered/')) {
      return jsonResponse(config, { is_registered: true })
    }

    if (url.startsWith('info/user/')) {
      return jsonResponse(config, {
        address: url.split('/').pop(),
        parent_referral_code: 'MAAT-DEV',
        referee_addresses: [
          '0x7777777777777777777777777777777777777777',
          '0x8888888888888888888888888888888888888888',
        ],
        created_referral_codes: [
          { code: 'MAAT-DEV', is_valid: true },
          { code: 'MAAT-TEST', is_valid: true },
        ],
        registered_at: nowIso,
      })
    }

    if (url === 'register') {
      return jsonResponse(config, {
        referral_codes: [
          { code: 'MAAT-DEV', is_valid: true },
          { code: 'MAAT-TEST', is_valid: true },
        ],
      })
    }

    return jsonResponse(config, {})
  }
}
