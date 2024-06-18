import ArrangeSquare from '@assets/icons/arrange-square.svg'
import Check from '@assets/icons/check.svg'
import ArrowDown from '@assets/icons/curve-arrow-down.svg'
import InfoCircle from '@assets/icons/info-circle.svg'
import { AmountInput } from '@components/amount-input/AmountInput'
import { DotLoader } from '@components/loader/DotLoader'
import { TokenIconComponent } from '@components/token-icon'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { useDisclosure } from '@hooks/useDisclosure'
import { cn } from '@utils/cn'
import { parseFloatLocale } from '@utils/formatValue'
import { useEffect, useState } from 'react'

import { useDepositStore } from './store/useDepositStore'

interface DepositReviewModalProperties {
  trigger: React.ReactNode
}

const AMOUNT_VALUE = '5350'
const AMOUNT_VALUE_USD = '5349.12'

export const DepositReviewModal = ({ trigger }: DepositReviewModalProperties) => {
  const [opened, { toggle }] = useDisclosure()
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

  const { asset, vault } = useDepositStore()
  return (
    <Dialog open={opened} onOpenChange={toggle}>
      <DialogTrigger className="group">{trigger}</DialogTrigger>
      <DialogContent className="max-w-[38.75rem] gap-10 text-text-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>Deposit Review</span>
            <InfoCircle className="size-6" />
          </DialogTitle>
        </DialogHeader>
        {/* Amount input blocks */}
        <div className="space-y-3">
          <div className="rounded-[1.25rem] border border-stroke p-6">
            <div className="flex items-center justify-between">
              <AmountInput value={inputValue} after={asset?.symbol} />
              <TokenWithNetwork
                symbol={asset?.symbol}
                network={asset?.network}
                position="top-right"
                width="2.14288rem"
              />
            </div>
            <p className="mt-4 text-gray">$ {inputValueUsd}</p>
          </div>
          <div className="rounded-[1.25rem] border border-stroke p-6">
            <div className="flex items-center justify-between">
              <AmountInput value={inputValue} after={vault} />
              <TokenIconComponent symbol={vault} className="size-[2.14288rem]" />
            </div>
            <p className="mt-4 text-gray">$ {inputValueUsd}</p>
          </div>
          <p className="text-base text-text-100">
            1 USDT = 0.95723 USDC <span className="text-gray">($3,2382)</span>
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
              <span className={cn(approveStatus === 'success' && 'text-[#58CDAD]')}>
                Approve USDC spending
              </span>
              {approveStatus === 'approving' && <DotLoader />}
              {approveStatus === 'success' && (
                <Check className="ml-2 size-6 overflow-visible [&_path]:stroke-[#58CDAD]" />
              )}
            </p>
          </div>
          <ArrowDown />
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
        <Button size="lg">Approve</Button>
      </DialogContent>
    </Dialog>
  )
}
