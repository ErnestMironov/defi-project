import { useGetSquidSwapRoute } from '@api/squid-router/useGetSquidSwapRoute'
import useSquidSDK from '@api/squid-router/useSquidSdk'
import ArrangeSquare from '@assets/icons/arrange-square.svg'
import Check from '@assets/icons/check.svg'
import ArrowDown from '@assets/icons/curve-arrow-down.svg'
import EmptyWalletSquare from '@assets/icons/empty-wallet-square.svg'
import ReceiveSquare from '@assets/icons/receive-square.svg'
import lottieLoader from '@assets/lottie/deposit-steps-loader.json'
import { AmountInput } from '@components/amount-input/AmountInput'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { useTokenAsset } from '@hooks/useTokenAsset'
import { cn } from '@utils/cn'
import { parseFloatLocale } from '@utils/formatValue'
import Lottie from 'lottie-react'
import { useEffect, useMemo } from 'react'
import { parseEther } from 'viem'

import { useTxStore } from '../store/useDepositStore'
import { useCheckAllowance } from './hooks/useCheckAllowance'
import { useFullDepositFlow } from './hooks/useFullDepositFlow'

export const DepositReviewModal = () => {
  const { ActionButton, stepsState, resetStore, isSwapNeeded, isNetworkArb } =
    useFullDepositFlow()
  console.log('🚀 ~ stepsState:', stepsState)

  const {
    depositAsset: asset,
    depositNetwork: chain,
    vault,
    inputValue: amount,
    currentModal,
    setCurrentModal,
    inputValueInUSD,
  } = useTxStore()
  const chainData = useTokenAsset(chain)
  const inputValue = parseFloatLocale(amount, 8) as string

  const { isAllowed } = useCheckAllowance()

  const { squid } = useSquidSDK()

  const vaultAddress = useMemo(() => {
    const depositTokenAsset = squid?.tokens.find(
      (token) => token.symbol?.toLowerCase() === vault.toLowerCase(),
    )
    return depositTokenAsset?.address!
  }, [squid?.tokens, vault])

  const { route } = useGetSquidSwapRoute({
    fromAmount: parseEther(amount).toString(),
    fromChain: String(chainData?.chainId),
    fromToken: asset?.contract_address!,
    toChain: '42161',
    toToken: vaultAddress,
    enableBoost: true,
  })

  useEffect(resetStore, [asset])

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
        <div className="flex flex-col items-start gap-[0.44rem] text-lg">
          {isSwapNeeded && (
            <>
              {!asset?.native_token && (
                <>
                  <div className="flex items-center gap-3">
                    <TokenWithNetwork
                      symbol={asset?.contract_ticker_symbol}
                      network={asset?.chain_id}
                      position="bottom-right"
                      width="2rem"
                    />
                    <p className="flex items-center">
                      <span
                        className={cn(
                          stepsState.approve1.error && 'text-red-100',
                          stepsState.currentStep !== 'approve1' && 'text-gray-80',
                          stepsState.approve1.isSuccess && 'text-[#58CDAD]',
                        )}
                      >
                        Approve {asset?.contract_ticker_symbol} spending
                      </span>
                      {stepsState.approve1.isPending && (
                        <Lottie
                          className="relative -left-4 h-8"
                          animationData={lottieLoader}
                          loop
                        />
                      )}
                      {stepsState.approve1.isSuccess ? (
                        <Check className="ml-2 size-6 overflow-visible [&_path]:stroke-[#58CDAD]" />
                      ) : null}
                      {!isAllowed && stepsState.approve1.error && (
                        <div className="ml-3 flex items-center justify-center rounded-lg bg-input-error px-2 py-1 text-red-100">
                          {stepsState.approve1.error}
                        </div>
                      )}
                    </p>
                  </div>
                  <ArrowDown className="h-[1.125rem] w-8" />
                </>
              )}

              {/* SWAP STEP */}

              <div className="flex items-center gap-3">
                <ArrangeSquare
                  className={cn(
                    'size-8',
                    '[&_path]:fill-[#8763F326]',
                    (stepsState.currentStep === 'swap' || stepsState.swap.isSuccess) &&
                      '[&_path]:fill-[#8763F3B2]',
                  )}
                />
                <p className="flex items-center">
                  <span
                    className={cn(
                      stepsState.swap.error && 'text-red-100',
                      stepsState.currentStep !== 'swap' && 'text-gray-80',
                      stepsState.swap.isSuccess && 'text-[#58CDAD]',
                    )}
                  >
                    Confirm swap
                  </span>{' '}
                  {/* {depositStatus === 'pending' && ( */}
                  {stepsState?.swap?.isPending && (
                    <Lottie
                      className="relative -left-4 h-8"
                      animationData={lottieLoader}
                      loop
                    />
                  )}
                  {stepsState.swap.isSuccess ? (
                    <Check className="ml-2 size-6 overflow-visible [&_path]:stroke-[#58CDAD]" />
                  ) : null}
                  {stepsState.swap.error && (
                    <div className="ml-3 flex items-center justify-center rounded-lg bg-input-error px-2 py-1 text-red-100">
                      {stepsState.swap.error}
                    </div>
                  )}
                </p>
              </div>

              <ArrowDown className="h-[1.125rem] w-8" />
            </>
          )}

          {/* SWITCH TO ARBITRUM  */}

          {!isNetworkArb ||
          stepsState.currentStep === 'switchToArbitrum' ||
          stepsState.switchToArbitrum.isSuccess ? (
            <>
              <div className="flex items-center gap-3">
                <EmptyWalletSquare
                  className={cn(
                    'size-8',
                    '[&_path]:fill-[#8763F326]',
                    (stepsState.currentStep === 'switchToArbitrum' ||
                      stepsState.switchToArbitrum.isSuccess) &&
                      '[&_path]:fill-[#8763F3B2]',
                  )}
                />
                <p className="flex items-center">
                  <span
                    className={cn(
                      stepsState.switchToArbitrum.error && 'text-red-100',
                      stepsState.currentStep !== 'switchToArbitrum' && 'text-gray-80',
                      stepsState.switchToArbitrum.isSuccess && 'text-[#58CDAD]',
                    )}
                  >
                    Switch network to Arbitrum
                  </span>
                  {stepsState.switchToArbitrum?.isPending && (
                    <Lottie
                      className="relative -left-4 h-8"
                      animationData={lottieLoader}
                      loop
                    />
                  )}
                  {stepsState.switchToArbitrum.isSuccess ? (
                    <Check className="ml-2 size-6 overflow-visible [&_path]:stroke-[#58CDAD]" />
                  ) : null}
                  {stepsState.switchToArbitrum.error && (
                    <div className="ml-3 flex items-center justify-center rounded-lg bg-input-error px-2 py-1 text-red-100">
                      {stepsState.switchToArbitrum.error}
                    </div>
                  )}
                </p>
              </div>

              <ArrowDown className="h-[1.125rem] w-8" />
            </>
          ) : null}

          {/* APPROVE FOR DEPOSIT STEP  */}

          <div className="flex items-center gap-3">
            <TokenWithNetwork
              symbol={vault}
              network="Arbitrum"
              position="bottom-right"
              width="2rem"
              className={cn({
                'opacity-15': stepsState.currentStep !== 'approve2',
              })}
            />
            <p className="flex items-center">
              <span
                className={cn({
                  'text-red-100': stepsState.approve2.error,
                  'text-gray-80': stepsState.currentStep !== 'approve2',
                  'text-[#58CDAD]': stepsState.approve2.isSuccess,
                })}
              >
                Approve {vault} spending
              </span>
              {stepsState.approve2.isPending && (
                <Lottie
                  className="relative -left-4 h-8"
                  animationData={lottieLoader}
                  loop
                />
              )}
              {stepsState.approve2.isSuccess ? (
                <Check className="ml-2 size-6 overflow-visible [&_path]:stroke-[#58CDAD]" />
              ) : null}
              {stepsState.approve2.error && (
                <div className="ml-3 flex items-center justify-center rounded-lg bg-input-error px-2 py-1 text-red-100">
                  {stepsState.approve2.error}
                </div>
              )}
            </p>
          </div>

          <ArrowDown className="h-[1.125rem] w-8" />

          {/* DEPOSIT  */}

          <div className="flex items-center gap-3">
            <ReceiveSquare
              className={cn(
                'size-8',
                '[&_path]:fill-[#8763F326]',
                stepsState.currentStep === 'deposit' && '[&_path]:fill-[#8763F3B2]',
              )}
            />
            <p className="flex items-center">
              <span
                className={cn({
                  'text-red-100': stepsState.deposit.error,
                  'text-gray-80': stepsState.currentStep !== 'deposit',
                })}
              >
                Deposit {vault}
              </span>
              {stepsState?.deposit?.isPending && (
                <Lottie
                  className="relative -left-4 h-8"
                  animationData={lottieLoader}
                  loop
                />
              )}
              {stepsState.deposit.isSuccess && (
                <Check className="ml-2 size-6 overflow-visible [&_path]:stroke-[#58CDAD]" />
              )}
              {stepsState.deposit.error && (
                <div className="ml-3 flex items-center justify-center rounded-lg bg-input-error px-2 py-1 text-red-100">
                  {stepsState.deposit.error}
                </div>
              )}
            </p>
          </div>
        </div>
        <ActionButton />
      </DialogContent>
    </Dialog>
  )
}
