// @ts-ignore
import 'react-gif-player/dist/gifplayer.css'

import depositGif from '@assets/gif/Chest_Deposit.gif'
import withdrawGif from '@assets/gif/Chest_Withdraw.gif'
import DepositDoneStillImg from '@assets/images/Deposit_Done_Still.png'
import WithdrawDoneStillImg from '@assets/images/Withdraw_Done_Still.png'
import { useScanLink } from '@components/scan-link/ScanLink'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent } from '@components/ui/dialog'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { TX_TYPE } from '@constants/txTypes'
import { formatAmount } from '@utils/formatValue'
import { getRandomOkAnalog } from '@utils/phrases'
import { useMemo } from 'react'
// @ts-ignore
import GifPlayer from 'react-gif-player'

import { useTransactionStore } from './store/usePendingTransactionsStore'
import { useTxStore } from './store/useTxStore'

export const DoneModal = () => {
  const { removeTransaction } = useTransactionStore()

  const {
    txType,
    depositTotalAmount,
    depositToNetwork,
    setCurrentModal,
    vault,
    depositAsset,
    currentModal,
    depositTotalInUSD,
    withdrawAmount,
    mtToken,
    resetStore,
    transactionHash,
  } = useTxStore()

  const scanLink = useScanLink(
    (txType === TX_TYPE.DEPOSIT ? depositAsset?.chain_id : mtToken?.chainData?.chainId) ??
      CHAIN_IDS_BY_NAME.Arbitrum,
    undefined,
    transactionHash as string | undefined,
  )

  const onClose = () => {
    if (transactionHash) {
      removeTransaction(transactionHash)
    }
    resetStore()
    setCurrentModal(null)
  }

  const imageSource = useMemo(() => {
    switch (txType) {
      case TX_TYPE.DEPOSIT: {
        return {
          gif: depositGif,
          still: DepositDoneStillImg,
        }
      }
      case TX_TYPE.WITHDRAW: {
        return {
          gif: withdrawGif,
          still: WithdrawDoneStillImg,
        }
      }
      default: {
        return {
          gif: '',
          still: '',
        }
      }
    }
  }, [txType])

  const title = useMemo(() => {
    switch (txType) {
      case TX_TYPE.DEPOSIT: {
        return 'Deposit was successful'
      }
      case TX_TYPE.WITHDRAW: {
        return 'Withdraw was successful'
      }
      default: {
        return ''
      }
    }
  }, [txType])

  const amount = useMemo(() => {
    switch (txType) {
      case TX_TYPE.DEPOSIT: {
        return (
          <>
            <div className="flex items-center gap-2">
              <TokenWithNetwork
                width="1.5rem"
                position="bottom-right"
                symbol={vault}
                network={depositToNetwork}
              />
              {formatAmount(depositTotalAmount, { maximumFractionDigits: 2 })}
              <span className="text-text-80">{vault}</span>
            </div>
            <span className="text-gray-100">
              ${formatAmount(depositTotalInUSD, { maximumFractionDigits: 2 })}
            </span>
          </>
        )
      }
      case TX_TYPE.WITHDRAW: {
        return (
          <>
            <div className="flex items-center gap-2">
              <TokenWithNetwork
                width="1.5rem"
                position="bottom-right"
                symbol={mtToken?.stable}
                network={mtToken?.chainData?.chainId}
              />
              {formatAmount(withdrawAmount, { maximumFractionDigits: 2 })}
              <span className="text-text-80">{depositAsset?.contract_ticker_symbol}</span>
            </div>
            <span className="text-gray-100">
              ${formatAmount(withdrawAmount, { maximumFractionDigits: 2 })}
            </span>
          </>
        )
      }
      default: {
        return ''
      }
    }
  }, [
    depositAsset?.contract_ticker_symbol,
    depositToNetwork,
    depositTotalAmount,
    depositTotalInUSD,
    mtToken?.chainData?.chainId,
    mtToken?.stable,
    txType,
    vault,
    withdrawAmount,
  ])

  const okAnalog = useMemo(() => getRandomOkAnalog(), [])

  return (
    <Dialog open={currentModal === 'done'} onOpenChange={onClose}>
      <DialogContent
        onClose={onClose}
        className="flex flex-col items-center gap-8 self-stretch rounded-[2rem] p-0 pb-8 max-lg:bottom-0 max-lg:top-auto max-lg:z-[100] max-lg:max-w-full max-lg:translate-y-0 max-lg:rounded-b-none"
        showCloseButton
      >
        <div className="relative flex w-full flex-col items-center justify-center rounded-[2rem] bg-[rgba(222,_221,_236,_0.10)] px-8 pb-5">
          <div className="flex h-80 items-center justify-center overflow-hidden">
            <GifPlayer
              gif={imageSource.gif}
              still={imageSource.still}
              autoplay
              pauseRef={(pause: any) => {
                // Останавливаем GIF после одного проигрывания
                setTimeout(() => {
                  pause()
                }, 3000) // Предполагаем, что длительность GIF - 3 секунды
              }}
            />
          </div>
          <p className="text-[1.125rem] font-normal text-green-100">{title}</p>
          <p className="mt-3 flex items-center gap-3 text-[1.125rem]/[120%] text-text">
            {amount}
          </p>
        </div>
        <div className="w-full px-8">
          <a href={scanLink} target="_blank" rel="noreferrer" className="block">
            <Button variant="outline" className="w-full font-normal">
              view transaction
            </Button>
          </a>
          <Button onClick={onClose} variant="default" className="mt-4 w-full font-normal">
            {okAnalog}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
