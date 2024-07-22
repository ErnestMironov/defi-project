import type { ITokenData } from '@api/tokens-balance/api'
import Usdt from '@assets/icons/tokens/usdt.svg'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import type { TxType } from '@constants/txTypes'
import { TX_TYPE } from '@constants/txTypes'
import { Chains } from '@covalenthq/client-sdk'
import { create } from 'zustand'

import type { UserMTokenInfo } from '../interface'

type Vault = 'USDT' | 'USDC'

type ModalState = 'review' | 'deposit' | 'withdraw' | 'done' | 'error'
interface SelectedAssetState {
  // TODO: Define the state
  depositAsset: ITokenData | null
  setDepositAsset: (by: ITokenData | null) => void

  depositNetwork: Chains | null
  setDepositNetwork: (by: Chains | null) => void

  withdrawNetwork: Chains | null
  setWithdrawNetwork: (by: Chains | null) => void

  vault: Vault
  setVault: (by: Vault) => void

  mtToken: UserMTokenInfo
  setMToken: (by: UserMTokenInfo) => void

  txType: TxType
  setTxType: (by: TxType) => void

  inputValue: string
  setInputValue: (value: string) => void

  inputValueInUSD: string
  setInputValueInUSD: (value: string) => void

  currentModal: ModalState | null
  setCurrentModal: (by: ModalState | null) => void

  depositAmount: string
  setDepositAmount: (value: string) => void

  withdrawAmount: string
  setWithdrawAmount: (value: string) => void
}

export const useTxStore = create<SelectedAssetState>()((set) => ({
  inputValue: '',
  setInputValue: (by) => set({ inputValue: by }),
  inputValueInUSD: '0',
  setInputValueInUSD: (by) => set({ inputValueInUSD: by }),
  // asset
  depositAsset: null,
  setDepositAsset: (by) => set({ depositAsset: by }),
  // network
  depositNetwork: null,
  setDepositNetwork: (by) => set({ depositNetwork: by }),
  withdrawNetwork: Chains.ARBITRUM_MAINNET,
  setWithdrawNetwork: (by) => set({ withdrawNetwork: by }),
  // vault
  vault: 'USDT',
  setVault: (by) => set({ vault: by }),
  // mtToken
  mtToken: {
    TokenIcon: Usdt,
    symbol: 'mtUSDT',
    stable: 'usdt',
    chainId: CHAIN_IDS_BY_NAME.Arbitrum,
    mtAddress: '0x0dac12432d034B3fd923709FDC097B84557d0Bb4',
    __typename: 'Balance',
    asset: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
    balance: '0',
    lpBalance: '0',
  },
  setMToken: (by) => set({ mtToken: by }),
  // tx type
  txType: TX_TYPE.DEPOSIT,
  setTxType: (by) => set({ txType: by, inputValue: '' }),

  // modal
  currentModal: null,
  setCurrentModal: (by) => set({ currentModal: by }),

  // deposit amount
  depositAmount: '',
  setDepositAmount: (by) => set({ depositAmount: by }),

  // withdraw amount
  withdrawAmount: '',
  setWithdrawAmount: (by) => set({ withdrawAmount: by }),
}))
