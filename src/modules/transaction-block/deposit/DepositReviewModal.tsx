import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import useSquidSDK from '@api/squid-router/useSquidSdk'
import { AmountInput } from '@components/amount-input/AmountInput'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { parseFloatLocale } from '@utils/formatValue'
import { useMemo } from 'react'
import { parseUnits } from 'viem'

import { useTxStore } from '../store/useDepositStore'
import { NativeOnchainSwap } from './deposit-wizards/NativeOnchainSwap'
import { SimpleDeposit } from './deposit-wizards/SimpleDeposit'
import { useCheckAllowance } from './hooks/useCheckAllowance'
import { useFullDepositFlow } from './hooks/useFullDepositFlow'

export const DepositReviewModal = () => {
  const { ActionButton, stepsState, isSwapNeeded, isNetworkArb } = useFullDepositFlow()
  console.log('🚀 ~ stepsState:', stepsState)

  const {
    depositAsset: asset,
    vault,
    inputValue: amount,
    currentModal,
    setCurrentModal,
    inputValueInUSD,
  } = useTxStore()
  const chainData = useTokenAsset(asset?.chain_id)
  const inputValue = parseFloatLocale(amount, 8) as string

  const { isAllowed } = useCheckAllowance()

  const { squid } = useSquidSDK()

  const tokenAddrForVault = useMemo(() => {
    const depositTokenAsset = squid?.tokens.find(
      (token) => token.symbol?.toLowerCase() === vault.toLowerCase(),
    )
    return depositTokenAsset?.address!
  }, [squid?.tokens, vault])

  const { route } = useGetSquidSwapRoute({
    fromAmount: parseUnits(amount, asset?.contract_decimals ?? 6).toString(),
    fromChain: String(chainData?.chainId),
    fromToken: asset?.contract_address!,
    toChain: '42161',
    toToken: tokenAddrForVault,
    enableBoost: true,
  })

  return (
    <Dialog open={currentModal === 'review'} onOpenChange={() => setCurrentModal(null)}>
      <DialogContent className="max-w-[38.75rem] gap-10 text-text">
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
                value={inputValue}
                after={asset?.contract_ticker_symbol}
                readOnly
                className="select-none"
              />
              <TokenWithNetwork
                symbol={asset?.contract_ticker_symbol}
                network={asset?.chain_id}
                position="top-right"
                width="2.14288rem"
              />
            </div>
            <p className="mt-4 text-gray-100">
              ${' '}
              {isSwapNeeded
                ? route?.estimate?.fromAmountUSD
                : parseFloatLocale(inputValue)}
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-stroke-100 p-6">
            <div className="flex items-center justify-between">
              <AmountInput
                value={isSwapNeeded ? inputValueInUSD : inputValue}
                after={vault}
                readOnly
              />
              <TokenIconComponent symbol={vault} className="size-[2.14288rem]" />
            </div>
            <p className="mt-4 text-gray-100">
              ${' '}
              {isSwapNeeded ? route?.estimate?.toAmountUSD : parseFloatLocale(inputValue)}
            </p>
          </div>
          {/* <p className="text-base text-text-80">
            1 USDT = 0.95723 USDC <span className="text-gray-100">($3,2382)</span>
          </p> */}
        </div>

        {/* APPROVE FOR SWAP STEP  */}
        <SimpleDeposit />
        <NativeOnchainSwap />
      </DialogContent>
    </Dialog>
  )
}
