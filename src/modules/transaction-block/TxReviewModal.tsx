import CollapseIcon from '@assets/icons/collapse.svg'
import ExpandIcon from '@assets/icons/expand_2.svg'
import { Dialog, DialogContent, DialogHeader } from '@components/ui/dialog'
import { cloneElement } from 'react'

import { DepositReviewContent } from './deposit/DepositReviewContent'
import { useTxStore } from './store/useTxStore'
import { SwatOverlay } from './SwatOverlay'
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
    setBrakeBalance,
    brakeBalance,
    collapseTxInfo,
    setCollapseTxInfo,
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
    setBrakeBalance(false)
    setCollapseTxInfo(false)
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
    <>
      {brakeBalance && <SwatOverlay />}
      <Dialog open={currentModal === 'review'}>
        <DialogContent
          onClose={handleClose}
          className="text-text max-w-[38.75rem] overflow-visible !bg-transparent"
          showCloseButton
        >
          <div className="overflow-hidden rounded-3xl bg-cards-widget">
            <DialogHeader className="flex flex-row justify-between gap-4 lg:px-8">
              {intermediateError && (
                <div className="rounded-[12.5rem] bg-red-5 px-4 py-2 text-red-100">
                  {intermediateError.split('.')[0]}
                </div>
              )}
            </DialogHeader>

            {renderContent()}
            <button
              type="button"
              className="flex w-full flex-row items-center justify-center gap-[0.38rem] border-t border-stroke-100 bg-text-3100/5 px-6 py-3 text-[0.875rem] font-medium text-text-3100"
              onClick={() => setCollapseTxInfo(!collapseTxInfo)}
            >
              {collapseTxInfo ? (
                <>
                  <ExpandIcon className="size-4" /> See Details
                </>
              ) : (
                <>
                  <CollapseIcon className="size-4" /> Condense
                </>
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
