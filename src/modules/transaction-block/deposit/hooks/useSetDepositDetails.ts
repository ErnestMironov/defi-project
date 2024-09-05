import { USDC_TOKENS } from '@api/squid-router/postHook/data/USDC'
import { USDT_TOKENS } from '@api/squid-router/postHook/data/USDT'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import {
  formatAmountValue,
  formatTokenBalance,
  formatValueWithPrecision,
} from '@utils/formatValue'
import { useEffect } from 'react'
import { type Address } from 'viem'

export const useSetDepositDetails = () => {
  const {
    squidRoute,
    depositFromNetwork,
    depositToNetwork,
    vault,
    inputValue,
    depositAsset,
    vaultAddress,
    setVaultAddress,
    setDepositTotalInUSD,
    setDepositTotalAmount,
    setTxDifficulty,
    setIsTxZAP,
  } = useTxStore()

  useEffect(() => {
    if (!squidRoute) {
      setDepositTotalInUSD(formatValueWithPrecision(inputValue ?? '0', 2) ?? '0')
      setDepositTotalAmount(inputValue ?? '0')
      return
    }

    setDepositTotalInUSD(squidRoute?.estimate?.toAmountMinUSD ?? '0')
    setDepositTotalAmount(formatTokenBalance(squidRoute?.estimate?.toAmountMin, 6) ?? '0')
  }, [
    squidRoute?.estimate?.fromAmountUSD,
    squidRoute?.estimate?.toAmountMinUSD,
    setDepositTotalInUSD,
    squidRoute,
    vault,
    depositToNetwork,
    setVaultAddress,
    inputValue,
    setDepositTotalAmount,
  ])

  useEffect(() => {
    if (!vault) return

    // eslint-disable-next-line default-case
    switch (vault) {
      case 'USDC': {
        setVaultAddress(
          USDC_TOKENS.find((token) => token.chainId === depositToNetwork)
            ?.address as unknown as Address,
        )
        return
      }
      case 'USDT': {
        setVaultAddress(
          USDT_TOKENS.find((token) => token.chainId === depositToNetwork)
            ?.address as unknown as Address,
        )
      }
    }
  }, [depositFromNetwork, depositToNetwork, setTxDifficulty, setVaultAddress, vault])

  useEffect(() => {
    if (
      depositFromNetwork === depositToNetwork &&
      depositAsset?.contract_address.toLowerCase() === vaultAddress?.toLowerCase()
    ) {
      setIsTxZAP(false)
      setDepositTotalInUSD(formatAmountValue(inputValue ?? '0', 2) ?? '0')
      return
    }

    setIsTxZAP(true)
  }, [
    depositAsset?.contract_address,
    depositFromNetwork,
    depositToNetwork,
    inputValue,
    setDepositTotalInUSD,
    setIsTxZAP,
    vaultAddress,
  ])

  useEffect(() => {
    if (depositFromNetwork === depositToNetwork) {
      setTxDifficulty('on_chain')
    } else {
      setTxDifficulty('cross_chain')
    }
  }, [depositFromNetwork, depositToNetwork, setTxDifficulty])
}
