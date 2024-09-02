import Rainbow from '@assets/images/rainbow-circle.png'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { formatAmountValue } from '@utils/formatValue'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTransactionStore } from './store/usePendingTransactionsStore'
import { useTxStore } from './store/useTxStore'

export const DoneModal = () => {
  const navigate = useNavigate()

  const { removeTransaction } = useTransactionStore()

  const {
    txType,
    vault,
    setCurrentModal,
    currentModal,
    depositTotalInUSD,
    withdrawAmount,
    mtToken,
    resetStore,
    transactionHash,
  } = useTxStore()

  const onClose = () => {
    if (transactionHash) {
      removeTransaction(transactionHash)
    }
    resetStore()
    setCurrentModal(null)
  }

  const title = useMemo(() => {
    switch (txType) {
      case 'deposit': {
        return 'YOU DEPOSITED'
      }
      case 'withdraw': {
        return 'YOU WITHDREW'
      }
      default: {
        return ''
      }
    }
  }, [txType])

  const amount = useMemo(() => {
    switch (txType) {
      case 'deposit': {
        return formatAmountValue(depositTotalInUSD)
      }
      case 'withdraw': {
        return formatAmountValue(withdrawAmount)
      }
      default: {
        return ''
      }
    }
  }, [depositTotalInUSD, txType, withdrawAmount])

  return (
    <Dialog open={currentModal === 'done'} onOpenChange={onClose}>
      <DialogContent className="max-w-[38.75rem] rounded-[2rem] text-text max-lg:max-w-[96%]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 uppercase">Done!</DialogTitle>
        </DialogHeader>
        <div className="relative mt-6 flex h-[14.5625rem] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-input-default shadow-shadow">
          <img
            src={Rainbow}
            alt="Rainbow"
            className="dark:opacity-1 absolute bottom-[-15.1rem] right-[-15.8rem] size-[27.9375rem] animate-[spin_20s_linear_infinite] opacity-50 "
          />
          <p className="text-xl font-normal text-gray-100">{title}</p>
          <p className="mt-1 text-[3.75rem]/[4.5rem] text-text">{amount}</p>
          <div className="mt-[0.38rem] flex items-center gap-3">
            {txType === 'withdraw' ? (
              <TokenWithNetwork
                width="1.75rem"
                position="bottom-right"
                symbol={mtToken?.stable}
                network={mtToken?.chainData?.chainId}
              />
            ) : (
              <TokenIconComponent symbol={vault} className="size-7" />
            )}
            <span className="text-2.5xl text-gray-100">{vault}</span>
          </div>
        </div>
        <Button
          onClick={() => navigate('/analytics')}
          variant="outline"
          className="mt-10 font-normal"
        >
          Go check analytics
        </Button>
        <Button onClick={onClose} className="mt-3 font-normal">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
