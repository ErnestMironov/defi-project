import useSquidSDK from '@api/squid-router/useSquidSdk'
import { AmountInput } from '@components/amount-input/AmountInput'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { useTokenAsset } from '@hooks/useTokenAsset'
import {
  parseFloatLocale,
  replaceCommasWithDots,
  trimTrailingZeros,
} from '@utils/formatValue'
import { useMemo } from 'react'

import { useTxStore } from '../store/useDepositStore'
import { CrossChainSwap } from './deposit-wizards/CrossChainSwap'
import { NativeCrossChainSwap } from './deposit-wizards/NativeCrossChainSwap'
import { NativeOnchainSwap } from './deposit-wizards/NativeOnchainSwap'
import { OnchainSwap } from './deposit-wizards/OnchainSwap'
import { SimpleDeposit } from './deposit-wizards/SimpleDeposit'
import { useTokenApy } from './hooks/useTokenApy'

export const DepositReviewModal = () => {
  const {
    depositAsset: asset,
    vault,
    inputValue: amount,
    currentModal,
    inputValueInUSD,
    setCurrentModal,
  } = useTxStore()
  const chainData = useTokenAsset(asset?.chain_id)
  const inputValue = parseFloatLocale(amount, 8) as string

  const { usdcApy, usdtApy } = useTokenApy()

  const apy = useMemo(() => {
    if (vault === 'USDC' && usdcApy) {
      return `${usdcApy}%`
    }
    if (vault === 'USDT' && usdtApy) {
      return `${usdtApy}%`
    }
    return '0.00%'
  }, [usdcApy, usdtApy, vault])

  const { squid } = useSquidSDK()

  const tokenAddrForVault = useMemo(() => {
    const depositTokenAsset = squid?.tokens.find(
      (token) => token.symbol?.toLowerCase() === vault.toLowerCase(),
    )
    return depositTokenAsset?.address!
  }, [squid?.tokens, vault])

  const depositFlow = useMemo(() => {
    if (!asset || !chainData || !tokenAddrForVault) {
      return null // Return null if any required data is missing
    }

    const assetContractAddress = asset.contract_address?.toLowerCase()
    const vaultAddress = tokenAddrForVault.toLowerCase()

    if (vaultAddress === assetContractAddress) {
      return <SimpleDeposit />
    }

    if (chainData.chainId === 42_161) {
      if (asset.native_token) {
        return <NativeOnchainSwap />
      }
      return <OnchainSwap />
    }

    if (asset.native_token) {
      return <NativeCrossChainSwap />
    }

    return <CrossChainSwap />
  }, [asset, chainData, tokenAddrForVault])

  return (
    <Dialog open={currentModal === 'review'} onOpenChange={() => setCurrentModal(null)}>
      <DialogContent className="max-w-[38.75rem] gap-10 text-text max-lg:z-[100] max-lg:max-w-[95vw]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>Deposit Review</span>
            {/* <InfoCircle className="size-6" /> */}
          </DialogTitle>
        </DialogHeader>
        {/* Amount input blocks */}
        <div className="space-y-3">
          <div className="rounded-[1.25rem] border border-stroke-100 p-6">
            <div className="flex items-center justify-between">
              <AmountInput
                value={replaceCommasWithDots(trimTrailingZeros(inputValue))}
                after={asset?.contract_ticker_symbol}
                readOnly
                className="select-none"
              />
              <TokenWithNetwork
                symbol={asset?.contract_ticker_symbol}
                network={asset?.chain_id}
                position="bottom-right"
                width="2.14288rem"
              />
            </div>
            <p className="mt-4 text-gray-100">$ {parseFloatLocale(inputValueInUSD)}</p>
          </div>
          <div className="rounded-[1.25rem] border border-stroke-100 p-6">
            <div className="flex items-center justify-between">
              <AmountInput value={inputValueInUSD} after={vault} readOnly />
              <TokenIconComponent symbol={vault} className="size-[2.14288rem]" />
            </div>
            <div className="mt-4 flex justify-between text-gray-100">
              <p>$ {parseFloatLocale(inputValueInUSD)}</p>
              <p className="font-bold">{apy}</p>
            </div>
          </div>
          {/* <p className="text-base text-text-80">
            1 USDT = 0.95723 USDC <span className="text-gray-100">($3,2382)</span>
          </p> */}
        </div>
        {depositFlow}
      </DialogContent>
    </Dialog>
  )
}
