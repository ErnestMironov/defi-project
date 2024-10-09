import Arrow from '@assets/icons/curve-arrow-down.svg'
import Star from '@assets/icons/star.svg'
import { Button } from '@components/ui/button'
import { ROUTES } from '@routes/routes'
import { cn } from '@utils/cn'
import { formatUsdValue } from '@utils/formatValue'
import type { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

interface DustTooltipProperties extends ComponentProps<'div'> {
  usdValue: number | string
}

export const DustTooltip = (props: DustTooltipProperties) => {
  const { className, usdValue, ...rest } = props
  const navigate = useNavigate()

  if (Number(usdValue) < 100) return null

  return (
    <div
      className={cn(
        'py-4 px-3 rounded-xl bg-[rgba(97,_96,_255,_0.05)] text-text-80 flex items-start gap-[0.38rem]',
        className,
      )}
      {...rest}
    >
      <Star className="h-[1.375rem] w-[1.125rem]" />
      <p className="text-semi-base/[1.3125rem]">
        Your assets are gathering dust...
        <br />
        Deposit and earn up to{' '}
        <span className="font-bold">
          {formatUsdValue(usdValue, { maximumFractionDigits: 0, notation: 'compact' })}
        </span>{' '}
        extra per year.
      </p>
      <Button
        size="icon"
        variant="light"
        onClick={() => navigate(ROUTES.DEPOSIT)}
        className="ml-auto flex size-9 flex-col gap-3 self-center rounded-[0.42856rem] bg-light-blue-15 normal-case"
      >
        <Arrow className="shrink-0 -rotate-90 [&_path]:stroke-light-blue-100" />
      </Button>
    </div>
  )
}
