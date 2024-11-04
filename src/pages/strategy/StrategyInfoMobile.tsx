import { useStrategy } from '@api/maat-finance/useStrategy'
import Planet from '@assets/icons/planet.svg'
import { CopyButton } from '@components/copy/CopyButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

interface StrategyInfoProperties extends ComponentProps<'div'> {}

export const StrategyInfoMobile = (props: StrategyInfoProperties) => {
  const { className, ...rest } = props
  const { id } = useParams()

  const { data: strategy, isLoading, error } = useStrategy(id)
  if (isLoading || error) {
    return <StrategyInfoMobileSkeleton />
  }

  const protocolDescription = strategy?.info?.protocol?.description
  const protocol_link = strategy?.info?.protocol?.link
  const strategyDescription = strategy?.info?.strategy_description

  return (
    <div
      className={cn(
        'mt-8 grid grid-cols-2 gap-2 *:rounded-2xl *:bg-cards *:p-4 *:shadow-[0px_3px_1px_0px_rgba(135,99,243,0.12)]',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-start justify-center gap-1">
        <h6 className="text-[0.75rem]/[0.9rem] text-gray-100">APY</h6>
        <p className="flex items-start gap-2 text-2xl">
          {formatPercentValue(strategy?.apy)}
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-1">
        <h6 className="text-[0.75rem]/[0.9rem] text-gray-100">TVL</h6>
        <p className="flex items-start gap-2 text-2xl">
          {formatUsdValue(strategy?.tvl ?? 0, {
            notation: 'compact',
          })}
        </p>
      </div>
      <div className="col-span-2 flex flex-col gap-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="strategy-info">
            <AccordionTrigger>
              <h6 className="text-lg uppercase text-text">Strategy Info</h6>
            </AccordionTrigger>
            <AccordionContent>
              <p className="mt-4 text-base text-text">{strategyDescription}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-between">
          <p className="text-base text-gray-100">Strategy ID</p>
          <div className="flex items-center gap-3 text-base text-text">
            <span>{shortenAddress(id ?? '')}</span>
            <CopyButton text={id ?? ''} />
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="strategy-info">
            <AccordionTrigger>
              <h6 className="text-lg uppercase text-text">Protocol Info</h6>
            </AccordionTrigger>
            <AccordionContent>
              <p className="mt-4 text-base text-text">{protocolDescription}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-between">
          <p className="text-base text-gray-100">Link to protocol</p>
          <a
            target="_blank"
            href={protocol_link}
            className="flex items-center gap-3 text-base text-text"
            rel="noreferrer"
          >
            <Planet className="size-6" />
            <span>{protocol_link?.replace('https://', '')}</span>
          </a>
        </div>
      </div>
    </div>
  )
}

const StrategyInfoMobileSkeleton = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  return (
    <div
      className={cn(
        'mt-8 grid grid-cols-2 gap-2 *:rounded-2xl *:bg-cards *:p-4 *:shadow-[0px_3px_1px_0px_rgba(135,99,243,0.12)]',
        className,
      )}
      {...rest}
    >
      <div className="flex flex-col items-start justify-center gap-1">
        <h6 className="text-[0.75rem]/[0.9rem] text-gray-100">APY</h6>
        <p className="flex items-start gap-2 text-2xl">
          <Skeleton className="h-8 w-40" />
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-1">
        <h6 className="text-[0.75rem]/[0.9rem] text-gray-100">TVL</h6>
        <p className="flex items-start gap-2 text-2xl">
          <Skeleton className="h-8 w-40" />
        </p>
      </div>
      <div className="col-span-2 flex flex-col gap-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="strategy-info">
            <AccordionTrigger>
              <h6 className="text-lg uppercase text-text">Strategy Info</h6>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-between">
          <p className="text-base text-gray-100">Strategy ID</p>
          <div className="flex items-center gap-3 text-base text-text">
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="strategy-info">
            <AccordionTrigger>
              <h6 className="text-lg uppercase text-text">Protocol Info</h6>
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-between">
          <p className="text-base text-gray-100">Link to protocol</p>
          <Skeleton className="h-6 w-40" />
        </div>
      </div>
    </div>
  )
}
