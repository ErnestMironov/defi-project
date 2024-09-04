import { USDC_TOKENS } from '@api/squid-router/postHook/data/USDC'
import { USDT_TOKENS } from '@api/squid-router/postHook/data/USDT'
import { useTxStore } from '@modules/transaction-block/store/useTxStore'
import { formatAmountValue } from '@utils/formatValue'
import { useEffect } from 'react'
import type { Address } from 'viem'

export const useSetDepositDetails = () => {
  const {
    squidRoute,
    depositAsset,
    depositFromNetwork,
    depositToNetwork,
    vault,
    vaultAddress,
    inputValue,
    setVaultAddress,
    setDepositTotalInUSD,
    setTxDifficulty,
    setIsTxZAP,
  } = useTxStore()

  useEffect(() => {
    if (!squidRoute) return

    setDepositTotalInUSD(squidRoute?.estimate?.toAmountMinUSD ?? '0')
  }, [
    squidRoute?.estimate?.fromAmountUSD,
    squidRoute?.estimate?.toAmountMinUSD,
    setDepositTotalInUSD,
    squidRoute,
    vault,
    depositToNetwork,
    setVaultAddress,
    inputValue,
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
