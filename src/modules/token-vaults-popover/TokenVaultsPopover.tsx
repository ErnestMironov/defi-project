import { useVaults } from '@api/maat-finance/useVaults'
import { TokenAddressByChainPopover } from '@pages/token/TokenAdressesByChainPopover'
import { type ComponentProps, useMemo } from 'react'
import { useParams } from 'react-router-dom'

interface TokenVaultsPopoverProperties extends ComponentProps<'div'> {
  symbol?: string
}

export const TokenVaultsPopover = (props: TokenVaultsPopoverProperties) => {
  const { className, symbol } = props
  const { symbol: symbolFromParameters } = useParams()
  const tokenSymbol = symbol ?? symbolFromParameters
  const { data: vaults } = useVaults()
  const tokenVaults = useMemo(() => {
    if (!vaults) return []
    return vaults.filter((vault) => vault.token.symbol === tokenSymbol)
  }, [tokenSymbol, vaults])

  return <TokenAddressByChainPopover className={className} data={tokenVaults} />
}
