import Macklz from '@assets/images/macklz.png'
import { cn } from '@utils/cn'
import type { FC } from 'react'

import { VARIANT_STYLES } from './constants'
import type { SystemMessageProperties } from './types'

export const SystemMessage: FC<SystemMessageProperties> = ({
  variant,
  message,
  className,
}) => {
  const styles = VARIANT_STYLES[variant]

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-6 py-4 rounded-2xl justify-between',
        styles.background,
        styles.color,
        className,
      )}
    >
      <p className="font-medium leading-[1.5625rem]">{message}</p>
      <img src={Macklz} alt="macklz" className="h-[2.1875rem] w-[1.875rem]" />
    </div>
  )
}
