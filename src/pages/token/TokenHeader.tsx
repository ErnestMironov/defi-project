import ArrowDown from '@assets/icons/arrow-down.svg'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { VAULTS } from '@constants/vaults'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { useDisclosure } from '@hooks/common/useDisclosure'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'
import { NavLink, useParams } from 'react-router-dom'

interface TokenHeaderProperties extends ComponentProps<'div'> {}

export const TokenHeader = (props: TokenHeaderProperties) => {
  const { className, ...rest } = props
  const { symbol } = useParams()
  const [isOpen, { toggle, close }] = useDisclosure(false)
  const { isBelowDesktop } = useDeviceWidth()

  return (
    <div className={cn('mt-10 flex items-center', className)} {...rest}>
      <TokenIconComponent symbol={symbol} className="size-[2.8125rem] max-lg:size-7" />
      <div className="ml-3 flex gap-4 text-4xl max-lg:gap-2 max-lg:text-2xl">
        <h1>{symbol}</h1>
        <Popover open={isOpen} onOpenChange={toggle}>
          <PopoverTrigger>
            <ArrowDown
              className={cn('size-8 max-lg:size-6 transition', isOpen && 'rotate-180')}
            />
          </PopoverTrigger>
          <PopoverContent
            align={isBelowDesktop ? 'end' : 'start'}
            className="flex w-[15.625rem] flex-col gap-3 p-6 max-lg:w-[11.25rem] max-lg:gap-5 max-lg:px-4 max-lg:py-5"
          >
            {VAULTS.map((vault) => (
              <NavLink to={`${ROUTES.TOKENS}/${vault}`} onClick={close}>
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
