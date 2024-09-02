import CurveArrow from '@assets/icons/curve-arrow-down.svg'
import { cn } from '@utils/cn'
import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'

interface ArrowLinkProperties extends LinkProps {}

export const ArrowLink = (props: ArrowLinkProperties) => {
  const { className, ...rest } = props
  return (
    <Link
      className={cn(
        'size-[2.625rem] rounded-[0.5rem] bg-main-15 flex items-center justify-center',
        className,
      )}
      {...rest}
    >
      <CurveArrow className="size-8 -rotate-90 [&_path]:stroke-main-100" />
    </Link>
  )
}
