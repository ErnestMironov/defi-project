import { USDC_TOKENS } from '@constants/usdc'
import { USDT_TOKENS } from '@constants/usdt'
import { USDC_VAULT_ADDRESS, USDT_VAULT_ADDRESS } from '@constants/vaults'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { formatTokenBalance } from '@utils/formatValue'
import { useEffect } from 'react'
import { type Address, formatUnits } from 'viem'
import { MOCK_SWAP_LATENCY_MS, USE_MOCKS } from '@configs/mocks'

export const useSetDepositDetails = () => {
  const {
    swapRoute,
    depositFromNetwork,
    depositToNetwork,
    vault,
    inputValue,
    inputValueInUSD,
    depositAsset,
    vaultDepositTokenAddress,
    isTxZAP,
    setVaultAddress,
    setDepositTotalInUSD,
    setDepositTotalAmount,
    setTxDifficulty,
    setIsTxZAP,
    setVaultDepositTokenAddress, // Add this fucking line
  } = useTxStore()

  useEffect(() => {
    console.log('🚀 ~ useEffect ~ swapRoute:', swapRoute)
    if (USE_MOCKS && inputValue) {
      setDepositTotalInUSD(inputValueInUSD ?? inputValue)
      setDepositTotalAmount(inputValue ?? '0')
      return
    }

    if (!swapRoute || !isTxZAP) {
      setDepositTotalInUSD(inputValueInUSD ?? inputValue)
      setDepositTotalAmount(inputValue ?? '0')
      return
    }

    const applyTotals = () => {
      const amount = formatTokenBalance(
        swapRoute?.includedSteps?.[0]?.estimate?.toAmount ?? '0',
        swapRoute?.includedSteps?.[0]?.action?.toToken?.decimals ?? 6,
      )
      const amountUsd = formatUnits(
        BigInt(swapRoute?.includedSteps?.[0]?.estimate?.toAmount ?? '0'),
        swapRoute?.includedSteps?.[0]?.action?.toToken?.decimals ?? 6,
      )

      setDepositTotalInUSD(amountUsd)
      setDepositTotalAmount(amount ?? '0')
    }

    if (USE_MOCKS) {
      const timeout = setTimeout(applyTotals, MOCK_SWAP_LATENCY_MS)
      return () => clearTimeout(timeout)
    }

    applyTotals()
  }, [
    swapRoute,
    setDepositTotalInUSD,
    inputValue,
    inputValueInUSD,
    setDepositTotalAmount,
    isTxZAP,
  ])

  useEffect(() => {
    if (!vault) return

    switch (vault) {
      case 'USDC': {
        setVaultDepositTokenAddress(
          USDC_TOKENS.find((token) => token.chainId === depositToNetwork)
            ?.address as unknown as Address,
        )
        setVaultAddress(USDC_VAULT_ADDRESS)
        return
      }
      case 'USDT': {
        setVaultDepositTokenAddress(
          USDT_TOKENS.find((token) => token.chainId === depositToNetwork)
            ?.address as unknown as Address,
        )
        setVaultAddress(USDT_VAULT_ADDRESS)
        break
      }
      default:
    }
  }, [depositToNetwork, setVaultAddress, setVaultDepositTokenAddress, vault])

  useEffect(() => {
    if (
      depositFromNetwork === depositToNetwork &&
      depositAsset?.contract_address.toLowerCase() ===
        vaultDepositTokenAddress?.toLowerCase()
    ) {
      setIsTxZAP(false)
      setDepositTotalAmount(inputValue)
      setDepositTotalInUSD(inputValue)
      return
    }

    setIsTxZAP(true)
  }, [
    depositAsset?.contract_address,
    depositFromNetwork,
    depositToNetwork,
    inputValue,
    setDepositTotalAmount,
    setDepositTotalInUSD,
    setIsTxZAP,
    vaultDepositTokenAddress,
  ])

  useEffect(() => {
    if (depositFromNetwork === depositToNetwork) {
      setTxDifficulty('on_chain')
    } else {
      setTxDifficulty('cross_chain')
    }
  }, [depositFromNetwork, depositToNetwork, setTxDifficulty])
}
