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
  WITHDRAW_REQUEST_FULFILLMENT: 'Withdraw request fulfillment',
} as const

export const INCENTIVE_ACTION_TYPE = {
  INC_HARVEST: 'Harvest',
  INC_COMPOUND: 'Compound',
  INC_SWAP: 'Swap',
} as const
