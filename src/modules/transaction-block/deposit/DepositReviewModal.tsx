import useSquidSDK from '@api/squid-router/useSquidSdk'
import BigLoader from '@assets/lottie/wizard-main-loader.json'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { cn } from '@utils/cn'
import {
  parseFloatLocale,
  replaceCommasWithDots,
  trimTrailingZeros,
} from '@utils/formatValue'
import Lottie from 'lottie-react'
import { useMemo } from 'react'

import { useTxStore } from '../store/useDepositStore'
import { CrossChainSwap } from './deposit-wizards/CrossChainSwap'
import { NativeCrossChainSwap } from './deposit-wizards/NativeCrossChainSwap'
import { NativeOnchainSwap } from './deposit-wizards/NativeOnchainSwap'
import { OnchainSwap } from './deposit-wizards/OnchainSwap'
import { SimpleDeposit } from './deposit-wizards/SimpleDeposit'
import { useTokenApy } from './hooks/useTokenApy'

interface TokenInfoProperties {
  type: 'input' | 'deposit'
  amount: string
  tokenInfo: {
    symbol?: string
    chain_id?: number | string
  }
  usdAmount?: string
}

const TokenInfo: React.FC<TokenInfoProperties> = ({
  type,
  amount,
  tokenInfo,
  usdAmount,
}) => {
  const { symbol, chain_id } = tokenInfo

  return (
    <div className="flex w-full flex-col gap-2 text-[1.125rem]">
      <div className="flex w-full items-center justify-between">
        <span>{type === 'input' ? 'You input' : 'You will deposit '} </span>
        <div className="flex items-center gap-2">
          <div
            className={cn('rounded-[3rem] px-2 py-1', {
              'bg-red-5 text-red-80': type === 'input',
              'bg-green-15 text-green-100': type === 'deposit',
            })}
          >
            {type === 'input' ? '-' : '+ '}
            {amount}
          </div>
          <TokenWithNetwork
            symbol={symbol}
            network={chain_id}
            position="bottom-right"
            width="2.14288rem"
          />
          <span>{symbol}</span>
        </div>
      </div>
      <p className="self-end text-base text-gray-100">$ {parseFloatLocale(usdAmount)}</p>
    </div>
  )
}

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
      (token) => token.symbol?.toLowerCase() === vault?.toLowerCase(),
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
      <DialogContent className="max-w-[38.75rem] gap-10 rounded-[2rem] text-text max-lg:z-[100] max-lg:max-w-[95vw] lg:px-8 lg:py-10">
        <DialogHeader>
          <DialogTitle className="text-center lg:text-[1.5625rem]">
            Deposit Review
          </DialogTitle>
        </DialogHeader>
        <Lottie animationData={BigLoader} loop className="-scale-100" />
        {/* Amount input blocks */}
        <div className="flex flex-col items-start gap-4 self-stretch rounded-2xl border border-stroke-100 p-6">
          <TokenInfo
            type="input"
            amount={replaceCommasWithDots(trimTrailingZeros(inputValue))}
            tokenInfo={{
              symbol: asset?.contract_ticker_symbol,
              chain_id: asset?.chain_id,
            }}
            usdAmount={inputValueInUSD}
          />
          <div className="h-px w-full bg-stroke-100" />
          <TokenInfo
            type="deposit"
            amount={inputValueInUSD}
            tokenInfo={{
              symbol: vault,
              chain_id: asset?.chain_id,
            }}
            usdAmount={inputValueInUSD}
          />
        </div>
        {/* End of amount input blocks */}
        {depositFlow}
      </DialogContent>
    </Dialog>
  )
}
