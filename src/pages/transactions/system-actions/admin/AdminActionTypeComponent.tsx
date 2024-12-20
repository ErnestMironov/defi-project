import type { AdminEvent } from '@api/maat-finance/types'
import CheckIcon from '@assets/icons/check-square.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { ADMIN_ACTION_TYPE } from '@constants/action-type'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'

interface AdminActionTypeComponentProperties extends ComponentProps<'div'> {
  adminEvent: AdminEvent
}

export const AdminActionTypeComponent = (props: AdminActionTypeComponentProperties) => {
  const { className, adminEvent, ...rest } = props
  return (
    <div className={cn('flex items-center gap-4 max-lg:gap-2', className)} {...rest}>
      <CheckIcon className="size-8" />
      <div>
        <p className="flex items-center gap-1 text-base/[1.5rem] font-medium max-lg:text-sm">
          {ADMIN_ACTION_TYPE[adminEvent.action_type as keyof typeof ADMIN_ACTION_TYPE]
            .split(' ')
            .map((word, i, array) => {
              return (
                <span
                  className={cn('capitalize', i === array.length - 1 && 'text-text-260')}
                >
                  {word}
                </span>
              )
            })}
        </p>
        <div className="flex items-center gap-[0.38rem]">
          <p className="text-sm/[1.5rem] text-text-260 max-lg:text-sm">
            {shortenAddress(adminEvent.hash)}
          </p>
          <CopyButton text={adminEvent.hash} />
        </div>
      </div>
    </div>
  )
}
