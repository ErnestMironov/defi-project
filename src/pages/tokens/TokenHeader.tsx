import ArrowDown from '@assets/icons/arrow-down.svg'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { useDisclosure } from '@hooks/useDisclosure'
import { VAULTS } from '@modules/transaction-block/deposit/SelectVault'
import { cn } from '@utils/cn'
import { formatPercentValue, formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { NavLink, useParams } from 'react-router-dom'

interface TokenHeaderProperties extends ComponentProps<'div'> {}

export const TokenHeader = (props: TokenHeaderProperties) => {
  const { className, ...rest } = props
  const { symbol } = useParams()
  const [isOpen, { toggle, close }] = useDisclosure(false)
  return (
    <div className={cn('mt-10 flex items-center', className)} {...rest}>
      <TokenIconComponent symbol={symbol} className="size-[2.8125rem]" />
      <div className="ml-3 flex gap-4 text-4xl">
        <h1>{symbol}</h1>
        <p className="flex">
          <span>{formatUsdValue(10_123)}</span>
          <span className="ml-2 text-xl text-[#3883EB]">
            {formatPercentValue(1.123, { signDisplay: 'exceptZero' })}
          </span>
        </p>
        <Popover open={isOpen} onOpenChange={toggle}>
          <PopoverTrigger>
            <ArrowDown className={cn('size-8 transition', isOpen && 'rotate-180')} />
          </PopoverTrigger>
          <PopoverContent align="start" className="flex w-[15.625rem] flex-col gap-3 p-6">
            {VAULTS.map((vault) => (
              <NavLink to={`/tokens/${vault}`} onClick={close}>
                <IconWithLabelComponent
                  className="size-6 gap-2 text-lg"
                  key={vault}
                  symbol={vault}
                />
              </NavLink>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
