export const ACTION_TYPE = {
  ADD_STRATEGY: 'Add strategy',
  BRIDGE: 'Bridge',
  DEPOSIT: 'Deposit',
  DEPOSIT_IN_STRATEGY: 'Deposit in strategy',
  REBALANCE_FULFILLMENT: 'Rebalance fulfillment',
  REBALANCE_REQUEST: 'Rebalance request',
  REMOVE_STRATEGY: 'Remove strategy',
  WITHDRAW: 'Withdraw',
  WITHDRAW_REQUEST: 'Withdraw request',
  WITHDRAW_FROM_STRATEGY: 'Withdraw from strategy',
  WITHDRAW_FULFILLMENT: 'Withdraw fulfillment',
  WITHDRAW_REQUEST_FULFILLMENT: 'Withdraw request fulfillment',
  WATCHER_CHANGED: 'Watcher changed',
  WITHDRAW_CANCELING_DELAY: 'Withdraw canceling delay',
  FEE_CHANGED: 'Fee changed',
} as const

export const ANALYTICS_PAGE_EVENT_ACTION_TYPE = {
  DEPOSIT_IN_STRATEGY: 'Deposit in strategy',
  WITHDRAW_FROM_STRATEGY: 'Withdraw from strategy',
  BRIDGE: 'Bridge',
  WITHDRAW_FULFILLMENT: 'Withdraw fulfillment',
  DEPOSIT: 'Deposit',
  REBALANCE_REQUEST: 'Rebalance request',
  WITHDRAW_REQUEST: 'Withdraw request',
} as const

export const LAST_EVENT_ACTION_TYPE = {
  DEPOSIT_IN_STRATEGY: 'Deposit in strategy',
  WITHDRAW_FROM_STRATEGY: 'Withdraw from strategy',
  BRIDGE: 'Bridge',
  WITHDRAW_FULFILLMENT: 'Withdraw fulfillment',
  DEPOSIT: 'Deposit',
  REBALANCE_REQUEST: 'Rebalance request',
  WITHDRAW_REQUEST: 'Withdraw request',
  INC_HARVEST: 'Harvest',
  INC_SWAP: 'Swap',
  INC_COMPOUND: 'Compound',
  UPDATE_PPS: 'Update PPS',
  STRATEGY_REGISTERED: 'Strategy registered',
  STRATEGY_DEPRECATED: 'Strategy deprecated',
  VAULT_REGISTERED: 'Vault registered',
  VAULT_DEPRECATED: 'Vault deprecated',
} as const

export const LAST_EVENT_ACTION_TYPE_FOR_PORTFOLIO = {
  DEPOSIT_IN_STRATEGY: 'Deposit from strategy',
  DEPOSIT: 'Deposit',
  WITHDRAW_FROM_STRATEGY: 'Withdraw from strategy',
  WITHDRAW: 'Withdraw',
  WITHDRAW_REQUEST: 'Withdraw request',
  WITHDRAW_FULFILLMENT: 'Withdraw fulfillment',
  REBALANCE: 'Rebalance',
  BRIDGE: 'Bridge',
} as const

// Create a type from the keys of ACTION_TYPE
export type LAST_EVENT_ACTION = keyof typeof LAST_EVENT_ACTION_TYPE

export const INCENTIVE_ACTION_TYPE = {
  INC_HARVEST: 'Harvest',
  INC_COMPOUND: 'Compound',
  INC_SWAP: 'Swap',
} as const

export const STATUSES = ['success', 'in progress', 'failed'] as const

export const MAIN_ACTION_TYPE = {
  DEPOSIT: 'Deposit',
  REBALANCE_REQUEST: 'Rebalance request',
  WITHDRAW_REQUEST: 'Withdraw request',
} as const

export const ADMIN_ACTION_TYPE = {
  STRATEGY_REGISTERED: 'Strategy registered',
  STRATEGY_DEPRECATED: 'Strategy deprecated',
  VAULT_REGISTERED: 'Vault registered',
  VAULT_DEPRECATED: 'Vault deprecated',
  ORACLE_CHANGED: 'Oracle changed',
  INCENTIVE_CONTROLLER_CHANGED: 'Incentive controller changed',
  STARGATE_ADAPTER_CHANGED: 'Stargate adapter changed',
  ADD_STRATEGY: 'Add strategy',
  REMOVE_STRATEGY: 'Remove strategy',
  COMMANDER_CHANGED: 'Commander changed',
  FEE_CHANGED: 'Fee changed',
} as const

export const REPORT_ACTION_TYPE = {
  UPDATE_PPS: 'Update PPS',
} as const
