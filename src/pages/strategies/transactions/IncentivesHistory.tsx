import ActionIcon from '@assets/icons/action.svg'
import AssetIcon from '@assets/icons/asset.svg'
import ChainIcon from '@assets/icons/chain.svg'
import {
  SELECT_CHAINS,
  SELECT_INCENTIVES_ACTIONS,
  SELECT_TOKENS,
} from '@constants/select-constant'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { IncentivesHistoryDesktop } from '@modules/transaction-history/incentives/IncentivesHistoryDesktop'
import { IncentiveMobileWithFilters } from '@modules/transactions/incentive/IncentiveMobileWithFilters'
import type { ComponentProps } from 'react'

interface IncentivesHistoryProperties extends ComponentProps<'div'> {}

export const IncentivesHistory: React.FC<IncentivesHistoryProperties> = (props) => {
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <IncentiveMobileWithFilters />
  }
  return (
    <IncentivesHistoryDesktop
      filters={{
        search: { value: '', placeholder: 'Tx Hash' },
        chain: {
          items: SELECT_CHAINS,
          placeholder: 'All Chains',
          value: [],
          icon: <ChainIcon />,
        },
        token: {
          items: SELECT_TOKENS,
          placeholder: 'All Tokens',
          value: [],
          icon: <AssetIcon />,
        },
        actions_type: {
          items: SELECT_INCENTIVES_ACTIONS,
          placeholder: 'All Actions',
          value: [],
          icon: <ActionIcon />,
        },
      }}
      {...props}
    />
  )
}
