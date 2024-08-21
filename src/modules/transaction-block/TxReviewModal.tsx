import CloseIcon from '@assets/icons/close.svg'
import CollapseIcon from '@assets/icons/collapse.svg'
import BigLoader from '@assets/lottie/wizard-main-loader.json'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import Lottie from 'lottie-react'
import { cloneElement } from 'react'

import { CountdownTimer } from './components/CountDownTimer'
import { DepositReviewContent } from './deposit/DepositReviewContent'
import { useTxStore } from './store/useTxStore'
import { WithdrawReviewContent } from './withdraw/WithdrawReviewContent'

export const TxReviewModal = () => {
  const {
    currentModal,
    setCurrentModal,
    isTransactionCanBeCollapsed,
    txType,
    resetStore,
    isTransactionFromStore,
  } = useTxStore()

  const handleCountdownComplete = () => {
    console.log('Countdown complete')
    // Add any additional logic here
  }

  const handleClose = () => {
    if (isTransactionFromStore) {
      resetStore()
    }
    setCurrentModal(null)
  }

  const renderCloseButton = () => {
    if (isTransactionCanBeCollapsed) {
      return <CollapseIcon className="size-6" onClick={handleClose} />
    }
    return <CloseIcon className="size-6" onClick={handleClose} />
  }

  const renderContent = () => {
    const content =
      txType === 'deposit' ? <DepositReviewContent /> : <WithdrawReviewContent />

    if (isTransactionFromStore) {
      return cloneElement(content, { allStepsCompleted: true })
    }

    return content
  }

  return (
    <Dialog open={currentModal === 'review'} onOpenChange={handleClose}>
      <DialogContent
        className="max-w-[38.75rem] gap-10 rounded-[2rem] text-text max-lg:z-[100] max-lg:max-w-[95vw] lg:px-8 lg:py-10"
        showCloseButton={false}
      >
        <div className="absolute right-8 top-10 m-0 cursor-pointer">
          {renderCloseButton()}
        </div>
        <DialogHeader>
          <DialogTitle className="text-center normal-case lg:text-[1.5625rem]">
            {txType === 'deposit' ? 'Deposit' : 'Withdraw'} in progress
          </DialogTitle>
        </DialogHeader>
        <div>
          <Lottie animationData={BigLoader} loop className="-scale-100 opacity-80" />
          <CountdownTimer initialCountdown={12} onComplete={handleCountdownComplete} />
          <p className="mt-4 text-center font-[Arial] text-[1.125rem] leading-[120%] text-gray-100">
            Sit back and relax, the transaction will take some time. <br /> This window
            will be available till Tx completed.{' '}
            <a href="" className="text-main-100">
              View the transaction
            </a>
          </p>
        </div>

        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}
