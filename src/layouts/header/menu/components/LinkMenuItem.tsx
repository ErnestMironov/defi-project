import { cn } from '@utils/cn'
import clsx from 'clsx'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import type { IMenuItem } from '../hooks/useMenu'

export const LinkMenuItem = (props: IMenuItem & { withAnimationIcon?: boolean }) => {
  const {
    callback,
    href,
    label,
    src: Source,
    animationData,
    animationClassName,
    withAnimationIcon = true,
  } = props
  const [isHover, setIsHover] = useState(false)
  return (
    <Link
      onClick={callback}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      to={href}
      target="_blank"
      key={label}
      className={clsx(
        'relative inline-flex cursor-pointer items-center gap-3 text-[1.25rem] font-normal uppercase leading-[120%] tracking-[0.0125rem] hover:text-main-100 [&_svg:not(:first-child)_path]:hover:stroke-main-100',
      )}
    >
      {withAnimationIcon && animationData && (
        <img
          src={animationData}
          alt={label}
          className={cn('size-8', animationClassName)}
        />
      )}
      <span>{label}</span>

      {Source && <Source className="[&_path]:stroke-text size-4" />}
    </Link>
  )
}
