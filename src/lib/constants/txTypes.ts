export const TX_TYPE = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
} as const

export type TxType = (typeof TX_TYPE)[keyof typeof TX_TYPE]
