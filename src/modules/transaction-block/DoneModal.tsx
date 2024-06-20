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
import { useMemo } from 'react'

import { useDepositStore } from './store/useDepositStore'

type DoneModalProperties =
  | {
      txType: 'deposit'
      network?: string
    }
  | { txType: 'withdraw'; network: string }

export const DoneModal = ({ txType, network }: DoneModalProperties) => {
  const { vault, status, setStatus } = useDepositStore()
  const close = () => setStatus('pending')

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
    <Dialog open={status === 'success'} onOpenChange={close}>
      <DialogOverlay className="backdrop-blur-xl" />
      <DialogContent className="max-w-[38.75rem] text-text">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 uppercase">Done!</DialogTitle>
        </DialogHeader>
        <div className="relative mt-6 flex h-[14.5625rem] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] bg-input-default shadow-shadow">
          <p className="text-xl text-gray-100">{title}</p>
          <p className="mt-1 text-[3.75rem]/[4.5rem] text-text">1,500.0</p>
          <div className="mt-[0.38rem] flex items-center gap-3">
            {network ? (
              <TokenWithNetwork
                width="1.75rem"
                position="bottom-right"
                symbol={vault}
                network={network}
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
        <Button size="lg" variant="outline" className="mt-10">
          Go check analytics
        </Button>
        <Button size="lg" onClick={close} className="mt-3">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}
