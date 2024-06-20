import ArrangeSquare from '@assets/icons/arrange-square.svg'
import Check from '@assets/icons/check.svg'
import ArrowDown from '@assets/icons/curve-arrow-down.svg'
import InfoCircle from '@assets/icons/info-circle.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { DotLoader } from '@components/loader/DotLoader'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components/ui/dialog'
import { useDisclosure } from '@hooks/useDisclosure'
import { cn } from '@utils/cn'
import { parseFloatLocale } from '@utils/formatValue'
import { useEffect, useState } from 'react'

import { DoneModal } from '../DoneModal'
import { useDepositStore } from '../store/useDepositStore'

interface DepositReviewModalProperties {
  trigger: React.ReactNode
}

const AMOUNT_VALUE = '5350'
const AMOUNT_VALUE_USD = '5349.12'

export const DepositReviewModal = ({ trigger }: DepositReviewModalProperties) => {
  const [opened, { toggle, close }] = useDisclosure()
  const inputValue = parseFloatLocale(AMOUNT_VALUE) as string
  const inputValueUsd = parseFloatLocale(AMOUNT_VALUE_USD) as string

  const [approveStatus, setApproveStatus] = useState<'approving' | 'success' | 'error'>(
    'approving',
  )

  useEffect(() => {
    if (!opened) return
    setTimeout(() => {
      setApproveStatus('success')
    }, 2000)
  }, [approveStatus, opened])

  const { depositAsset: asset, vault, setStatus } = useDepositStore()
  return (
    <>
      <Dialog open={opened} onOpenChange={toggle}>
        {trigger}
        <DialogContent className="max-w-[38.75rem] gap-10 text-text">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span>Deposit Review</span>
              <InfoCircle className="size-6" />
            </DialogTitle>
          </DialogHeader>
          {/* Amount input blocks */}
          <div className="space-y-3">
            <div className="rounded-[1.25rem] border border-stroke-100 p-6">
              <div className="flex items-center justify-between">
                <AmountInput
                  value={inputValue}
                  after={asset?.symbol}
                  readOnly
                  className="select-none"
                />
                <TokenWithNetwork
                  symbol={asset?.symbol}
                  network={asset?.network}
                  position="top-right"
                  width="2.14288rem"
                />
              </div>
              <p className="mt-4 text-gray-100">$ {inputValueUsd}</p>
            </div>
            <div className="rounded-[1.25rem] border border-stroke-100 p-6">
              <div className="flex items-center justify-between">
                <AmountInput value={inputValue} after={vault} readOnly />
                <TokenIconComponent symbol={vault} className="size-[2.14288rem]" />
              </div>
              <p className="mt-4 text-gray-100">$ {inputValueUsd}</p>
            </div>
            <p className="text-base text-text-80">
              1 USDT = 0.95723 USDC <span className="text-gray-100">($3,2382)</span>
            </p>
          </div>
          {/* Approve */}
          <div className="flex flex-col items-start gap-[0.44rem] text-lg">
            <div className="flex items-center gap-3">
              <TokenWithNetwork
                symbol={asset?.symbol}
                network={asset?.network}
                position="bottom-right"
                width="2rem"
              />
              <p className="flex items-center">
                <span
                  className={cn(
                    approveStatus === 'success' && 'text-[#58CDAD]',
                    approveStatus === 'error' && 'text-red-100',
                  )}
                >
                  Approve USDC spending
                </span>
                {approveStatus === 'approving' && <DotLoader />}
                {approveStatus === 'success' && (
                  <Check className="ml-2 size-6 overflow-visible [&_path]:stroke-[#58CDAD]" />
                )}
                {approveStatus === 'error' && (
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
                  approveStatus === 'success' && '[&_path]:fill-[#8763F3B2]',
                )}
              />
              <p>
                <span>Confirm swap and stake</span>{' '}
                {approveStatus === 'success' && <DotLoader />}
              </p>
            </div>
          </div>
          <Button
            size="lg"
            onClick={() => {
              close()
              // setStatus('success')
              setStatus('error')
            }}
          >
            Approve
          </Button>
        </DialogContent>
      </Dialog>
      <DoneModal txType="deposit" />
    </>
  )
}
