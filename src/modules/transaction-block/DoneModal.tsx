// Импортируем стили для GifPlayer
import 'react-gif-player/dist/gifplayer.css'

import depositGif from '@assets/gif/Chest_Deposit.gif'
import withdrawGif from '@assets/gif/Chest_Withdraw.gif'
import DepositDoneStillImg from '@assets/images/Deposit_Done_Still.png'
import WithdrawDoneStillImg from '@assets/images/Withdraw_Done_Still.png'
import { useScanLink } from '@components/scan-link/ScanLink'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent } from '@components/ui/dialog'
import { TX_TYPE } from '@constants/txTypes'
import { formatAmount } from '@utils/formatValue'
import { useMemo } from 'react'
import GifPlayer from 'react-gif-player'

import { useTransactionStore } from './store/usePendingTransactionsStore'
import { useTxStore } from './store/useTxStore'

export const DoneModal = () => {
  const { removeTransaction } = useTransactionStore()

  const {
    txType,
    setCurrentModal,
    currentModal,
    depositTotalInUSD,
    withdrawAmount,
    mtToken,
    resetStore,
    transactionHash,
  } = useTxStore()

  const scanLink = useScanLink(
    mtToken?.chainData?.chainId as number,
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
            <div>
              <TokenWithNetwork
                width="1.75rem"
                position="bottom-right"
                symbol={mtToken?.stable}
                network={mtToken?.chainData?.chainId}
              />
              {formatAmount(depositTotalInUSD, { maximumFractionDigits: 2 })}
            </div>
            <span className="text-gray-100">
              ${formatAmount(depositTotalInUSD, { maximumFractionDigits: 2 })}
            </span>
          </>
        )
      }
      case TX_TYPE.WITHDRAW: {
        return formatAmount(withdrawAmount, { maximumFractionDigits: 2 })
      }
      default: {
        return ''
      }
    }
  }, [
    depositTotalInUSD,
    mtToken?.chainData?.chainId,
    mtToken?.stable,
    txType,
    withdrawAmount,
  ])

  return (
    <Dialog open={currentModal === 'done'} onOpenChange={onClose}>
      <DialogContent
        onClose={onClose}
        className="flex flex-col items-center gap-8 self-stretch p-0 pb-8"
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
          <p className="mt-3 gap-2 text-[1.125rem]/[120%] text-text">{amount}</p>
        </div>
        <div className="w-full px-8">
          <a href={scanLink} target="_blank" rel="noreferrer" className="block">
            <Button variant="outline" className="w-full font-normal">
              view transaction
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  )
}
