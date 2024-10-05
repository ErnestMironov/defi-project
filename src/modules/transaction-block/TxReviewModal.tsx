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
    <Dialog open={currentModal === 'review'}>
      <DialogContent
        onClose={handleClose}
        className="max-w-[38.75rem] gap-8 overflow-visible rounded-[2rem] px-4 text-text max-lg:bottom-0 max-lg:top-auto max-lg:z-[100] max-lg:max-w-full max-lg:translate-y-0 max-lg:rounded-b-none lg:gap-10 lg:px-0 lg:pb-7 lg:pt-10"
        showCloseButton
      >
        <DialogHeader className="flex flex-row justify-between gap-4 lg:px-8">
          <DialogTitle className="text-2xl font-normal normal-case leading-[2.625rem] max-lg:text-left lg:text-[1.75rem]">
            {txType === 'deposit' ? 'Deposit' : 'Withdraw'}
          </DialogTitle>
          {intermediateError && (
            <div className="rounded-[12.5rem] bg-red-5 px-4 py-2 text-red-100">
              {intermediateError.split('.')[0]}
            </div>
          )}
        </DialogHeader>

        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}
