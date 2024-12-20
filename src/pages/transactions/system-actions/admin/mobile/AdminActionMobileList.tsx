/* eslint-disable react/jsx-no-useless-fragment */
import type { AdminEvent } from '@api/maat-finance/types'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import {
  AdminActionMobileItem,
  SkeletonAdminActionMobileItem,
} from './AdminActionMobileItem'

interface AdminActionMobileListProperties extends ComponentProps<'div'> {
  adminActions?: AdminEvent[]
  loading?: boolean
  error?: any
}

export const AdminActionMobileList = (props: AdminActionMobileListProperties) => {
  const { className, adminActions, loading, error, ...rest } = props

  const renderBody = () => {
    switch (true) {
      case loading:
      case !!error: {
        return (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonAdminActionMobileItem key={i} />
            ))}
          </>
        )
      }
      default: {
        if (!adminActions || !adminActions?.length) {
          return <div className="text-center text-gray-500">No transactions found</div>
        }
        return (
          <>
            {adminActions?.map((adminAction, index) => (
              <AdminActionMobileItem key={index} adminAction={adminAction} />
            ))}
          </>
        )
      }
    }
  }

  return (
    <div
      className={cn('[&>*:not(:last-child)]:border-b border-stroke-100', className)}
      {...rest}
    >
      {renderBody()}
    </div>
  )
}
