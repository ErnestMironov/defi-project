import Error from '@assets/icons/error-circle.svg'
import Rainbow from '@assets/images/rainbow-circle.png'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'

import { useTxStore } from './store/useDepositStore'

export const FailModal = () => {
  const { currentModal, setCurrentModal } = useTxStore()
  const close = () => setCurrentModal(null)

  return (
    <Dialog open={currentModal === 'error'} onOpenChange={close}>
      <DialogContent className="max-w-[38.75rem] text-text">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 uppercase">Failed</DialogTitle>
        </DialogHeader>
        <div className="relative mt-6 flex h-[14.5625rem] flex-col items-start justify-center overflow-hidden rounded-[2.5rem] bg-input-error px-14 shadow-shadow">
          <div className="flex items-center gap-2">
            <Error className="size-6 overflow-visible" />
            <p className="text-[1.8125rem]/[2.175rem] tracking-[-0.0625rem] text-red-100">
              Transaction failed
            </p>
          </div>
          <p className="mt-[1.12rem] text-[1.25rem]/[1.5rem] uppercase text-gray-80">
            Reason: <br />
            User rejected transaction
          </p>

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
