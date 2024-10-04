// @ts-ignore
import 'react-gif-player/dist/gifplayer.css'

import depositErrorGif from '@assets/gif/Chest_Deposit_Error.gif'
import withdrawErrorGif from '@assets/gif/Chest_Withdraw_Error.gif'
import Error from '@assets/icons/error-circle.svg'
import DepositErrorStillImg from '@assets/images/Deposit_Error_Still.png'
import WithdrawErrorStillImg from '@assets/images/Withdraw_Error_Still.png'
import { useScanLink } from '@components/scan-link/ScanLink'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent } from '@components/ui/dialog'
import { CHAIN_IDS_BY_NAME } from '@constants/chains'
import { TX_TYPE } from '@constants/txTypes'
import { useMemo } from 'react'
// @ts-ignore
import GifPlayer from 'react-gif-player'

import { useTransactionStore } from './store/usePendingTransactionsStore'
import { useTxStore } from './store/useTxStore'

export const FailModal = () => {
  const {
    currentModal,
    setCurrentModal,
    resetStore,
    transactionHash,
    txType,
    depositAsset,
    mtToken,
  } = useTxStore()
  const { removeTransaction } = useTransactionStore()
  const close = () => {
    if (transactionHash) {
      removeTransaction(transactionHash)
    }
    resetStore()
    setCurrentModal(null)
  }

  const scanLink = useScanLink(
    (txType === TX_TYPE.DEPOSIT ? depositAsset?.chain_id : mtToken?.chainData?.chainId) ??
      CHAIN_IDS_BY_NAME.Arbitrum,
    undefined,
    transactionHash as string | undefined,
  )

  const imageSource = useMemo(() => {
    switch (txType) {
      case TX_TYPE.DEPOSIT: {
        return {
          gif: depositErrorGif,
          still: DepositErrorStillImg,
        }
      }
      case TX_TYPE.WITHDRAW: {
        return {
          gif: withdrawErrorGif,
          still: WithdrawErrorStillImg,
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

  return (
    <Dialog open={currentModal === 'error'} onOpenChange={close}>
      <DialogContent className="max-w-[38.75rem] p-0 pb-8 text-text max-lg:bottom-0 max-lg:top-auto max-lg:z-[100] max-lg:max-w-full max-lg:translate-y-0 max-lg:rounded-b-none">
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-[rgba(222,_221,_236,_0.10)] px-8 pb-5">
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
          <div className="flex items-center gap-2">
            <Error className="size-6 overflow-visible" />
            <p className="text-[1.125rem]/[120%] tracking-[-0.0625rem] text-red-100">
              Transaction failed
            </p>
          </div>
        </div>
        <div className="mt-8 flex w-full flex-col gap-4 px-8">
          <a href={scanLink} target="_blank" rel="noreferrer" className="block">
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-2xl max-lg:px-10 max-lg:py-6"
            >
              View transaction
            </Button>
          </a>
          <Button
            size="lg"
            onClick={close}
            className="w-full rounded-2xl max-lg:px-10 max-lg:py-6"
          >
            Try again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
