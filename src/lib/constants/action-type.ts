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

export const INCENTIVE_ACTION_TYPE = {
  INC_HARVEST: 'Harvest',
  INC_COMPOUND: 'Compound',
  INC_SWAP: 'Swap',
} as const

export const STATUSES = ['success', 'in progress', 'failed'] as const

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
} as const
