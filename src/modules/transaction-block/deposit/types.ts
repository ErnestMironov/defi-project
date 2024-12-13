import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import type { DialogContent } from '@components/ui/dialog'
import type { ChainType } from '@constants/chains'

export interface ResponsiveDialogContentProperties
  extends React.ComponentPropsWithoutRef<typeof DialogContent> {
  opened: boolean
  setOpened: (isOpen: boolean) => void
}

export interface TokensListItemProperties {
  onChange: (asset: ITokenData) => void
  token: ITokenData
  selected?: boolean
}

export interface SelectChainTriggerProperties {
  chain: ChainType | null
}
