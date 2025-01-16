import { useGetSwapRoute } from '@api/lifi/hooks/useGetSwapRoute'
import { AmountInput } from '@components/amount-input/AmountInput'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { Skeleton } from '@components/ui/skeleton'
import { useVaultAPY } from '@hooks/useVaultAPY'
import { useInputHandling } from '@modules/transaction-block/deposit/hooks/useInputHandling'
import { useInputValidation } from '@modules/transaction-block/deposit/hooks/useInputValidation'
import { useStaleAmountTracking } from '@modules/transaction-block/deposit/hooks/useStaleAmountTracking'
import { cn } from '@utils/cn'
import { formatValueWithPrecision } from '@utils/formatValue'
import { formatUnits } from 'viem'
import { useAccount } from 'wagmi'

import { SelectWithoutWalletPlaceholder } from '../SelectWithoutWalletPlaceholder'
import { useTxStore } from '../store/useTxStore'
import { DepositActionButton } from './components/DepositActionButton'
import { GetCryptoButton } from './components/GetCryptoButton'
import { SwappableInputs } from './components/SwappableInputs'
import { VaultSelection } from './components/VaultSelection'
import { useVaultSelection } from './hooks/useVaultSelection'
import { SelectDepositAsset } from './SelectDepositAssetModal'
import ZapFee from './zap-fee/ZapFee'

// Check if swap is needed
const isSwapRequired = (
  assetAddress: string | undefined,
  vault: string | undefined,
): boolean => {
  if (!assetAddress || !vault) return false
  return !assetAddress.toLowerCase().includes(vault.toLowerCase())
}

export const DepositInput = () => {
  const { isConnected } = useAccount()
  const { bestUSDCApy, bestUSDTApy, isLoading: isStrategiesLoading } = useVaultAPY()
  const { isPending: isRouteLoading } = useGetSwapRoute()
  const {
    depositAsset: asset,
    inputValue,
    inputValueInUSD,
    depositTotalAmount,
    vault,
    isTxZAP,
    swapRoute,
    setInputValue,
    setCurrentModal,
    setInputValueInUSD,
    setVault,
    setInputError,
  } = useTxStore()

  // Vault selection
  useVaultSelection({
    bestUSDCApy,
    bestUSDTApy,
    isStrategiesLoading,
    onVaultSelect: setVault,
  })

  // Asset balance handling
  const assetBalance = formatUnits(
    BigInt(asset?.balance?.toString() || '0'),
    asset?.contract_decimals || 6,
  )
  const prettyAssetBalance = formatValueWithPrecision(assetBalance, 5)

  // Input validation
  const error = useInputValidation({
    inputValue,
    assetBalance,
    inputValueInUSD,
    onError: setInputError,
    hasAsset: !!asset,
  })

  // Input handling
  const handleAction = useInputHandling({
    swapRoute,
    assetRate: asset?.rate,
    onInputValueChange: setInputValue,
    onUsdValueChange: setInputValueInUSD,
  })

  const needsSwap = isSwapRequired(asset?.contract_address, vault)
  const isAmountStale = useStaleAmountTracking({
    isRouteLoading,
    depositTotalAmount,
    isSwapRequired: needsSwap,
  })

  const showSkeleton = (isRouteLoading || isAmountStale) && needsSwap && isTxZAP
  return (
    <div>
      {/* Deposit Input Section */}
      <div
        className={cn(
          'bg-input-default dark:bg-input-active py-6 max-lg:p-4 px-8 border-y border-stroke-100',
          error && 'bg-input-error',
        )}
      >
        <span className="font-montreal text-[0.875rem] font-medium leading-6 text-text-60 max-lg:text-[0.75rem]">
          You deposit
        </span>
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <SwappableInputs
              tokenValue={inputValue}
              usdValue={inputValueInUSD}
              onTokenValueChange={(value) => handleAction('token', value)}
              onUsdValueChange={(value) => handleAction('usd', value)}
              error={error}
              asset={asset ? { ...asset, balance: BigInt(asset.balance) } : undefined}
              onMaxClick={() => handleAction('token', prettyAssetBalance)}
              rightElement={
                isConnected ? <SelectDepositAsset /> : <SelectWithoutWalletPlaceholder />
              }
            />
          </div>
        </div>
      </div>

      <VaultSelection />

      {/* Deposit Details Section */}
      <div
        className={cn(
          'flex w-full flex-col items-start justify-between max-lg:p-4  py-6 px-8 max-lg:mt-2 border-y border-stroke-100 max-lg:border-b-0',
        )}
      >
        <span className="font-montreal text-[0.875rem] font-medium leading-6 text-text-2100/50 max-lg:text-[0.75rem]">
          You stake
        </span>
        <div className="flex w-full items-center justify-between gap-2">
          {isConnected && asset ? (
            showSkeleton ? (
              <div className="flex h-[3.25rem] items-center">
                <Skeleton className="h-full w-[5.9375rem]" />
              </div>
            ) : (
              <AmountInput
                value={Number(depositTotalAmount).toFixed(2)}
                decimals={18}
                disabled
              />
            )
          ) : (
            <p className="text-[1.5rem] font-medium leading-[3.25rem] tracking-[-0.015rem] text-text-20 max-lg:text-[1rem]">
              Select the desired vault
            </p>
          )}
          {vault ? (
            <ChoiceBox
              disabled
              value={`${vault} Vault`}
              symbol={vault}
              className="overflow-visible px-4"
            />
          ) : (
            <div className="flex h-[3.25rem] items-center">
              <Skeleton className="h-full w-[9.375rem]" />
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-col items-center justify-center px-4 py-3">
        <DepositActionButton
          isConnected={isConnected}
          inputValue={inputValue}
          error={error}
          onModalOpen={() => setCurrentModal('review')}
        />
      </div>
      <GetCryptoButton className={cn(!error && 'hidden')} />
      {!error && <ZapFee />}
    </div>
  )
}
