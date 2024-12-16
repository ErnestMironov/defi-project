import type { AdminEvent } from '@api/maat-finance/types'
import Arrow from '@assets/icons/arrow.svg'
import MaskIcon from '@assets/icons/mask.svg'
import Dots from '@assets/icons/options-dots.svg'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
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
    <div>
      <div className="w-fit rounded-lg bg-light-blue-15 px-4 py-2">
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="mt-4 flex items-center gap-3 text-gray-100">
        <Skeleton className="size-6 rounded-full" />
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <Skeleton className="h-6 w-20 text-lg" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        <h6>From</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <Skeleton className="h-6 w-20 text-lg" />
        </div>
        <h6>To</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <Skeleton className="h-6 w-20 text-lg" />
        </div>
        <h6>Chain</h6>
        <div className="flex items-center gap-2">
          <Skeleton className="size-8 gap-3" />
          <Arrow />
          <Skeleton className="size-8 gap-3" />
        </div>
      </div>
      <h6>Tx Hash</h6>
      <div className="flex w-full items-center justify-end gap-2">
        <Skeleton className="h-6 w-20 text-lg" />
      </div>
    </div>
  )
}
