import Planet from '@assets/icons/planet.svg'
import { CopyButton } from '@components/copy/CopyButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import { shortenString } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

interface StrategyInfoProperties extends ComponentProps<'div'> {}

export const StrategyInfoMobile = (props: StrategyInfoProperties) => {
  const { className, ...rest } = props
  const { id } = useParams()
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
          {formatPercentValue(384)}
          <span className="text-[0.75rem]/[0.9rem] text-main-80">
            {formatPercentValue(15.72, { signDisplay: 'exceptZero' })}
          </span>
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-1">
        <h6 className="text-[0.75rem]/[0.9rem] text-gray-100">TVL</h6>
        <p className="flex items-start gap-2 text-2xl">
          {formatUsdValue(567.83)}
          <span className="text-[0.75rem]/[0.9rem] text-main-80">
            {formatPercentValue(15.72, { signDisplay: 'exceptZero' })}
          </span>
        </p>
      </div>
      <div className="col-span-2 flex flex-col gap-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="strategy-info">
            <AccordionTrigger>
              <h6 className="text-lg uppercase text-text">Strategy Info</h6>
            </AccordionTrigger>
            <AccordionContent>
              <p className="mt-4 text-base text-text">
                Lorem ipsum dolor sit amet consectetur. Feugiat lectus elementum faucibus
                odio vel mus. Libero euismod quis lobortis aliquam semper felis id. In
                nulla congue non arcu ipsum ultrices ultrices. Sed nisi ut pulvinar
                tincidunt blandit nisl nisl.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-between">
          <p className="text-base text-gray-100">Strategy ID</p>
          <div className="flex items-center gap-3 text-base text-text">
            <span>{shortenString(id ?? '', 5)}</span>
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
              <p className="mt-4 text-base text-text">
                Lorem ipsum dolor sit amet consectetur. Congue morbi suspendisse mattis
                malesuada. Tempus eget sapien adipiscing eget pulvinar
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-between">
          <p className="text-base text-gray-100">Link to protocol</p>
          <div className="flex items-center gap-3 text-base text-text">
            <Planet className="size-6" />
            <span>suspxvcendisse.rew</span>
          </div>
        </div>
      </div>
    </div>
  )
}
