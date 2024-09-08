import type { AdminEvent } from '@api/maat-finance/types'
import Scan from '@assets/icons/scan.svg'
import { CopyButton } from '@components/copy/CopyButton'
import { IconWithLabelComponent, TokenIconComponent } from '@components/token-icon'
import { Skeleton } from '@components/ui/skeleton'
import { ADMIN_ACTION_TYPE } from '@constants/action-type'
import { SYSTEM_ADDRESSES } from '@constants/system-addresses'
import { Arrow } from '@radix-ui/react-hover-card'
import { getFromNow } from '@utils/get-day-difference'
import { shortenString } from '@utils/transform'
import dayjs from 'dayjs'
import type { ComponentProps } from 'react'

interface AdminActionMobileItemProperties extends ComponentProps<'div'> {
  adminAction: AdminEvent
}

export const AdminActionMobileItem = (props: AdminActionMobileItemProperties) => {
  const { adminAction } = props
  return (
    <div>
      <div className="w-fit rounded-lg bg-light-blue-15 px-4 py-2">
        {SYSTEM_ADDRESSES[adminAction.txFrom as keyof typeof SYSTEM_ADDRESSES]}
      </div>
      <div className="mt-4 flex items-center gap-3 text-gray-100">
        <span>
          {ADMIN_ACTION_TYPE[adminAction.action_type as keyof typeof ADMIN_ACTION_TYPE]}
        </span>
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <span>{getFromNow(dayjs(adminAction.creation_time).toString())}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        <h6>To</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <p className="whitespace-nowrap">{shortenString(adminAction.to)}</p>
          <Scan className="size-5 shrink-0" />
          <CopyButton text={adminAction.to} className="size-6 shrink-0" />
        </div>
        <h6>Chain</h6>
        <div className="flex items-center gap-2">
          {adminAction.dst_chain_id &&
          adminAction.src_chain_id !== adminAction.dst_chain_id ? (
            <>
              <TokenIconComponent
                symbol={adminAction.src_chain_id}
                className="size-8 gap-3"
              />
              <Arrow />
              <TokenIconComponent
                symbol={adminAction.dst_chain_id}
                className="size-8 gap-3"
              />
            </>
          ) : (
            <IconWithLabelComponent
              symbol={adminAction.src_chain_id}
              className="size-8 gap-3"
            />
          )}
        </div>
        <h6>Tx Hash</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <p>{shortenString(adminAction.hash)}</p>
          <Scan className="size-5 shrink-0" />
          <CopyButton text={adminAction.hash} className="size-6 shrink-0" />
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
      <div className="w-fit rounded-lg bg-light-blue-15 px-4 py-2">MAAT Admin</div>
      <div className="mt-4 flex items-center gap-3 text-gray-100">
        <Skeleton className="size-6 rounded-full" />
        <div className="h-[1.0625rem] w-px bg-gray-50" />
        <Skeleton className="h-6 w-20 text-lg" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-y-[0.82rem] text-base even:[&>*]:justify-self-end">
        <h6>From</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <Skeleton className="h-6 w-20 text-lg" />
          <Scan className="size-5 shrink-0" />
          <Skeleton className="size-6 shrink-0" />
        </div>
        <h6>To</h6>
        <div className="flex w-full items-center justify-end gap-2">
          <Skeleton className="h-6 w-20 text-lg" />
          <Scan className="size-5 shrink-0" />
          <Skeleton className="size-6 shrink-0" />
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
        <Scan className="size-5 shrink-0" />
        <Skeleton className="size-6 shrink-0" />
      </div>
    </div>
  )
}
