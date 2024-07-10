import Rainbow from '@assets/images/rainbow-circle.png'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@components/ui/dialog'
import { formatAmountValue } from '@utils/formatValue'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTxStore } from './store/useDepositStore'

export const DoneModal = () => {
  const navigate = useNavigate()

  const { txType, vault, setCurrentModal, currentModal, withdrawNetwork, depositAmount } =
    useTxStore()

  const formattedAmount = formatAmountValue(depositAmount)

  const onClose = () => setCurrentModal(null)

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
  return (
    <Dialog open={currentModal === 'done'} onOpenChange={onClose}>
      <DialogOverlay className="backdrop-blur-xl" />
      <DialogContent className="max-w-[38.75rem] text-text">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 uppercase">Done!</DialogTitle>
        </DialogHeader>
        <div className="relative mt-6 flex h-[14.5625rem] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-input-default shadow-shadow">
          <p className="text-xl text-gray-100">{title}</p>
          <p className="mt-1 text-[3.75rem]/[4.5rem] text-text">{formattedAmount}</p>
          <div className="mt-[0.38rem] flex items-center gap-3">
            {txType === 'withdraw' ? (
              <TokenWithNetwork
                width="1.75rem"
                position="bottom-right"
                symbol={vault}
                network={withdrawNetwork}
              />
            ) : (
              <TokenIconComponent symbol={vault} className="size-7" />
            )}
            <span className="text-2.5xl text-gray-100">{vault}</span>
          </div>
          <img
            src={Rainbow}
            alt="Rainbow"
            className="dark:opacity-1 absolute bottom-[-15.1rem] right-[-15.8rem] size-[27.9375rem] animate-[spin_20s_linear_infinite] opacity-50"
          />
        </div>
        <Button
          onClick={() => navigate('/analytics')}
          size="lg"
          variant="outline"
          className="mt-10"
        >
          Go check analytics
        </Button>
        <Button size="lg" onClick={onClose} className="mt-3">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
