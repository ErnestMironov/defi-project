import CloseIcon from '@assets/icons/close.svg'
import CollapseIcon from '@assets/icons/collapse.svg'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { cloneElement } from 'react'

import { DepositReviewContent } from './deposit/DepositReviewContent'
import { useTxStore } from './store/useTxStore'
import { WithdrawReviewContent } from './withdraw/WithdrawReviewContent'

export const TxReviewModal = () => {
  const {
    currentModal,
    setCurrentModal,
    setCurrentStep,
    currentStep,
    isTransactionCanBeCollapsed,
    txType,
    resetStore,
    isTransactionFromStore,
  } = useTxStore()

  const isTransactionSent =
    (isTransactionFromStore || isTransactionCanBeCollapsed) && currentStep === 3

  const handleClose = () => {
    if (isTransactionSent) {
      resetStore()
    }
    setCurrentStep(1)
    setCurrentModal(null)
  }

  const renderCloseButton = () => {
    if (isTransactionSent) {
      return (
        <CollapseIcon className="size-6 [&_path]:stroke-text-80" onClick={handleClose} />
      )
    }
    return <CloseIcon className="size-6 [&_path]:fill-text-80" onClick={handleClose} />
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
        className="max-w-[38.75rem] gap-10 rounded-[2rem] text-text max-lg:z-[100] max-lg:max-w-[95vw] lg:px-0 lg:py-10"
        showCloseButton={false}
      >
        <div className="absolute right-8 top-10 m-0 cursor-pointer">
          {renderCloseButton()}
        </div>
        <DialogHeader className="px-8">
          <DialogTitle className="text-[1.75rem] font-normal normal-case leading-[2.625rem]">
            {txType === 'deposit' ? 'Deposit' : 'Withdraw'}
          </DialogTitle>
        </DialogHeader>

        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}
