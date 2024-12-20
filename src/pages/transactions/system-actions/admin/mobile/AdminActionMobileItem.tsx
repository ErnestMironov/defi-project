import type { AdminEvent } from '@api/maat-finance/types'
import Arrow from '@assets/icons/arrow.svg'
import MaskIcon from '@assets/icons/mask.svg'
import Dots from '@assets/icons/options-dots.svg'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { ActionTypeSkeleton } from '@modules/transactions/actions/ActionType'
import { getFromNow } from '@utils/get-day-difference'
import { shortenAddress } from '@utils/transform'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

import { AdminActionTypeComponent } from '../AdminActionTypeComponent'

interface AdminActionMobileItemProperties extends ComponentProps<'div'> {
  adminAction: AdminEvent
}

export const AdminActionMobileItem = (props: AdminActionMobileItemProperties) => {
  const { adminAction } = props
  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between">
        <AdminActionTypeComponent adminEvent={adminAction} />
        <span className="text-sm text-text-2100">
          {getFromNow(dayjs(adminAction.creation_time).toString())}
        </span>
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-3 text-sm odd:[&>*]:text-text-2100 even:[&>*]:justify-self-end">
        <h6>Chain</h6>
        <div className="flex items-center gap-2">
          {adminAction.dst_chain_id &&
          adminAction.src_chain_id !== adminAction.dst_chain_id ? (
            <>
              <TokenIconComponent symbol={adminAction.src_chain_id} />
              <Arrow />
              <TokenIconComponent symbol={adminAction.dst_chain_id} />
            </>
          ) : (
            <IconWithLabelComponent symbol={adminAction.src_chain_id} />
          )}
        </div>
        <h6>From</h6>
        <div className="flex items-center gap-2">
          <MaskIcon className="size-4 shrink-0" />
          <span>MAAT Admin</span>
        </div>
        <h6>To</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <p className="whitespace-nowrap">{shortenAddress(adminAction.to)}</p>
          <div className="flex items-center justify-center rounded-lg border border-stroke-100 p-[0.38rem]">
            <Dots className="size-[0.8125rem] shrink-0" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const SkeletonAdminActionMobileItem = (
  _props: Omit<AdminActionMobileItemProperties, 'adminAction'>,
) => {
  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between">
        <ActionTypeSkeleton />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="mt-4 grid w-full grid-cols-[1fr_0fr] justify-between gap-y-3 text-sm odd:[&>*]:text-text-2100 even:[&>*]:justify-self-end">
        <h6>Chain</h6>
        <Skeleton className="h-4 w-16" />
        <h6>From</h6>
        <Skeleton className="h-4 w-16" />
        <h6>To</h6>
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}
