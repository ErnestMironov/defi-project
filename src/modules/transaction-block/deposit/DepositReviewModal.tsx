import ArrangeSquare from '@assets/icons/arrange-square.svg'
import Check from '@assets/icons/check.svg'
import ArrowDown from '@assets/icons/curve-arrow-down.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { DotLoader } from '@components/loader/DotLoader'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { cn } from '@utils/cn'
import { parseFloatLocale } from '@utils/formatValue'

import { useTxStore } from '../store/useDepositStore'
import { useApproveDepositTransaction } from './hooks/useApproveDepositTransaction'
import { useCheckAllowance } from './hooks/useCheckAllowance'
import { useDepositTransaction } from './hooks/useDepositTransaction'

export const DepositReviewModal = () => {
  const {
    depositAsset: asset,
    vault,
    inputValue: amount,
    currentModal,
    setCurrentModal,
  } = useTxStore()
  const inputValue = parseFloatLocale(amount) as string
  const { approve, status: approveStatus } = useApproveDepositTransaction()
  const { isAllowed } = useCheckAllowance()
  const { deposit, status: depositStatus } = useDepositTransaction()

  return (
    <Dialog open={currentModal === 'review'} onOpenChange={() => setCurrentModal(null)}>
      <DialogContent className="max-w-[38.75rem] gap-10 text-text">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>Deposit Review</span>
            {/* <InfoCircle className="size-6" /> */}
          </DialogTitle>
        </DialogHeader>
        {/* Amount input blocks */}
        <div className="space-y-3">
          <div className="rounded-[1.25rem] border border-stroke-100 p-6">
            <div className="flex items-center justify-between">
              <AmountInput
                value={inputValue}
                after={asset?.contract_ticker_symbol}
                readOnly
                className="select-none"
              />
              <TokenWithNetwork
                symbol={asset?.contract_ticker_symbol}
                network={asset?.chain_id}
                position="top-right"
                width="2.14288rem"
              />
            </div>
            <p className="mt-4 text-gray-100">$ {inputValue}</p>
          </div>
          <div className="rounded-[1.25rem] border border-stroke-100 p-6">
            <div className="flex items-center justify-between">
              <AmountInput value={inputValue} after={vault} readOnly />
              <TokenIconComponent symbol={vault} className="size-[2.14288rem]" />
            </div>
            <p className="mt-4 text-gray-100">$ {inputValue}</p>
          </div>
          {/* <p className="text-base text-text-80">
            1 USDT = 0.95723 USDC <span className="text-gray-100">($3,2382)</span>
          </p> */}
        </div>
        {/* Approve */}
        <div className="flex flex-col items-start gap-[0.44rem] text-lg">
          <div className="flex items-center gap-3">
            <TokenWithNetwork
              symbol={asset?.contract_ticker_symbol}
              network={asset?.chain_id}
              position="bottom-right"
              width="2rem"
            />
            <p className="flex items-center">
              <span
                className={cn(
                  (isAllowed || approveStatus === 'success') && 'text-[#58CDAD]',
                  approveStatus === 'error' && 'text-red-100',
                )}
              >
                Approve USDC spending
              </span>
              {approveStatus === 'pending' && <DotLoader />}
              {isAllowed ||
                (approveStatus === 'success' && (
                  <Check className="ml-2 size-6 overflow-visible [&_path]:stroke-[#58CDAD]" />
                ))}
              {!isAllowed && approveStatus === 'error' && (
                <div className="ml-3 flex items-center justify-center rounded-lg bg-input-error px-2 py-1 text-red-100">
                  Rejected
                </div>
              )}
            </p>
          </div>
          <ArrowDown className="h-[1.125rem] w-8" />
          <div className="flex items-center gap-3">
            <ArrangeSquare
              className={cn(
                'size-8',
                '[&_path]:fill-[#8763F326]',
                (isAllowed || approveStatus === 'success') && '[&_path]:fill-[#8763F3B2]',
              )}
            />
            <p>
              <span>Confirm swap and stake</span>{' '}
              {depositStatus === 'pending' && <DotLoader />}
            </p>
          </div>
        </div>
        {isAllowed ? (
          <Button size="lg" onClick={deposit} disabled={depositStatus === 'pending'}>
            Deposit
          </Button>
        ) : (
          <Button size="lg" onClick={approve} disabled={approveStatus === 'pending'}>
            Approve
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}
