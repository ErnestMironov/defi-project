/* eslint-disable @typescript-eslint/no-use-before-define */
import Copy from '@assets/icons/copy.svg'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { Button } from '@components/ui/button'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@components/ui/drawer'
import { useClipboard } from '@hooks/useClipboard'
import { cn } from '@utils/cn'
import { formatAmountValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import toast from 'react-hot-toast'

import type { StrategyType } from './Strategies'

interface StrategyMobileCardProperties extends ComponentProps<'div'> {
  strategy: StrategyType
  isLast?: boolean
}

export const StrategyMobileCard = (props: StrategyMobileCardProperties) => {
  const { strategy, isLast, ...rest } = props
  const { copy } = useClipboard()
  const handleCopy = (text: string) => {
    copy(text)
      .then(() => {
        toast.success('Copied!')
        console.log('addScaleCorrector')
      })
      .catch(() => {
        toast.error('Failed to copy.')
      })
  }
  return (
    <div {...rest}>
      <div className="flex items-center gap-3">
        <TokenIconComponent className="size-6" symbol={strategy.token} />
        <span className="text-lg">{strategy.token}</span>
      </div>
      <div className="my-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-[0.82rem] even:[&>*]:justify-self-end [&_h6]:text-base [&_h6]:leading-normal">
        <h6>Chain | Protocol</h6>
        <div className="flex items-center space-x-[-0.44rem]">
          <TokenIconComponent symbol={strategy.chain} className="size-6" />
          <TokenIconComponent symbol={strategy.protocol} className="size-6" />
        </div>
        <h6>Projected APY</h6>
        <div className="font-bold">{strategy.projectedApy}%</div>
        <h6>TVL</h6>
        <div>${formatAmountValue(String(strategy.tvl))}</div>
      </div>
      <Drawer>
        <DrawerTrigger className="w-full">
          <Button
            size="lg"
            variant="outline"
            className="w-full border-light-blue-100 text-light-blue-100"
          >
            Read more
          </Button>
        </DrawerTrigger>
        <DrawerContent className="px-6 pb-6 text-text-90">
          <DrawerTitle className="mt-6 text-lg font-bold">
            Strategy Description
          </DrawerTitle>
          <div className="hide-scrollbar mt-4 flex items-center gap-3 overflow-x-scroll text-base">
            <IconWithLabelComponent symbol={strategy.token} className="size-6" />
            <IconWithLabelComponent symbol={strategy.chain} className="size-6" />
            <IconWithLabelComponent symbol={strategy.protocol} className="size-6" />
          </div>
          <Divider />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-bold">
                Description
              </AccordionTrigger>
              <AccordionContent className="mr-5 mt-3 text-base">
                Sonne Finance is a decentralized lending protocol for individuals,
                institutions and protocols to access financial services. It is a
                permissionless, open source and Optimistic protocol serving users on
                Optimism. Users can deposit their assets, use them as collateral and
                borrow against them.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Divider />
          <h5 className="text-lg font-bold uppercase">Apy</h5>
          <div className="mt-3 grid grid-cols-2 gap-y-2 text-base even:[&>*]:justify-self-end even:[&>*]:font-bold">
            <h6>Last 7 days</h6>
            <div>52.48%</div>
            <h6>Last 30 days</h6>
            <div>56.29%</div>
            <h6>Inception</h6>
            <div>9.83%</div>
          </div>
          <Divider />
          <div className="flex items-center">
            <h6 className="text-lg font-bold">Address</h6>
            <div className="ml-auto max-w-[10.75rem] truncate">
              50xBb287E6017d3DE50xBb287E6017d3DE
            </div>
            <Copy
              type="button"
              className="size-5 overflow-visible"
              onClick={() => {
                console.log('asd')

                handleCopy('50xBb287E6017d3DE50xBb287E6017d3DE')
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
      {!isLast && <div className="my-6 h-px w-full bg-gray-50" />}
    </div>
  )
}

const Divider = ({ className }: ComponentProps<'div'>) => (
  <div className={cn('my-6 h-px bg-gray-50', className)} />
)
