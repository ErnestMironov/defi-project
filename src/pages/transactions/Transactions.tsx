import { Footer } from '@layouts/footer/Footer'
import { Events } from '@modules/events/Events'
import {
  SELECT_ACTIONS,
  SELECT_CHAINS,
  SELECT_STATUSES,
} from '@constants/select-constant'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

import { Breadcrumbs } from './Breadcrumbs'
import { SystemActions } from './system-actions/SystemActions'

interface TransactionsPageProperties extends ComponentProps<'div'> {}

export const Transactions = (props: TransactionsPageProperties) => {
  const { className, ...rest } = props
  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <Events
        className="mt-10 max-lg:mt-14"
        filters={{
          search: { value: '', placeholder: 'Tx hash  / Address' },
          action: { items: SELECT_ACTIONS, value: SELECT_ACTIONS[0] },
          status: { items: SELECT_STATUSES, value: SELECT_STATUSES[0] },
          chain: { items: SELECT_CHAINS, value: SELECT_CHAINS[0] },
        }}
      />
      <SystemActions className="mt-[6.25rem]" />
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}
