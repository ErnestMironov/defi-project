import CloseIcon from '@assets/icons/modal-close.svg'
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
    intermediateError,
    setIntermediateError,
    isTransactionFromStore,
  } = useTxStore()

  const isTransactionSent =
    (isTransactionFromStore || isTransactionCanBeCollapsed) && currentStep === 3

  const handleClose = () => {
    if (isTransactionSent) {
      resetStore()
    }
    setIntermediateError(null)
    setCurrentStep(1)
    setCurrentModal(null)
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
        className="max-w-[38.75rem] gap-10 overflow-visible rounded-[2rem] text-text max-lg:z-[100] max-lg:max-w-[95vw] lg:px-0 lg:py-10"
        showCloseButton={false}
      >
        <div className="absolute right-0 top-0 flex size-12 translate-y-[calc(-100%-.37rem)] cursor-pointer items-center justify-center rounded-full bg-[rgba(255,_255,_255,_0.30)]">
          <CloseIcon className="w-4" onClick={handleClose} />
        </div>
        <div className="absolute right-8 top-10 m-0 flex w-full cursor-pointer justify-end">
          {intermediateError && (
            <div className="max-w-[50%] rounded-[12.5rem] bg-red-5 px-4 py-2 text-red-100">
              {intermediateError.split('.')[0]}
            </div>
          )}
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
