import type { Action } from '@api/maat-finance/types'
import { useGetTransactionInfo } from '@api/maat-finance/useGetTransactionInfo'
import { SectionTitle } from '@components/section/SectionTitle'
import { MAIN_ACTION_TYPE } from '@constants/action-type'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { Footer } from '@layouts/footer/Footer'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Address } from 'viem'

import { Breadcrumbs } from './Breadcrumbs'
import { TransactionInfo } from './transaction-info/TransactionInfo'
import { TransactionHeader } from './TransactionHeader'

function detectMainActionType(action: Action) {
  return Object.prototype.hasOwnProperty.call(MAIN_ACTION_TYPE, action.action_type)
}

function sortActionsByDate(actions: Action[]) {
  return actions.sort((a, b) => +a.creation_time - +b.creation_time)
}

function findMainActionIndex(actions: Action[]) {
  return actions.findIndex(detectMainActionType)
}

export const TransactionPage = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { isBelowDesktop } = useDeviceWidth()
  const { tx_hash } = useParams()
  const { data } = useGetTransactionInfo(tx_hash as Address)

  const [mainAction, setMainAction] = useState<Action | undefined>(undefined)
  const [relatedActions, setRelatedActions] = useState<Action[]>([])

  useMemo(() => {
    if (!data) return null
    if (detectMainActionType(data.action)) {
      setMainAction(data.action)
      setRelatedActions(sortActionsByDate([...data.related_actions]))
    }

    const mainActionIndex = findMainActionIndex(data.related_actions)
    setMainAction(data.related_actions[mainActionIndex])
    setRelatedActions(
      sortActionsByDate([
        ...data.related_actions.filter((_, i) => i !== mainActionIndex),
        data.action,
      ]),
    )
  }, [data])

  if (isBelowDesktop) {
    return <TransactionPageMobile {...props} />
  }

  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <Breadcrumbs />
      <TransactionHeader className="mt-10" />
      <TransactionInfo
        className="mt-10"
        type={mainAction?.action_type}
        data={mainAction}
        withoutRelated={relatedActions.length === 0}
      />
      <SectionTitle className="mt-[4.44rem]">Triggered transactions</SectionTitle>
      <div className="mt-8 space-y-4">
        {relatedActions.map((action, i) => (
          <TransactionInfo key={i} type={action.action_type} data={action} />
        ))}
      </div>
      <Footer className="mt-[7.5rem]" />
    </div>
  )
}

export const TransactionPageMobile = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { tx_hash } = useParams()
  const { data } = useGetTransactionInfo(tx_hash as Address)

  return (
    <div className={cn('mt-8', className)} {...rest}>
      <TransactionHeader />
      <TransactionInfo
        className="mt-6"
        type={data?.action?.action_type}
        data={data?.action}
      />
      <SectionTitle className="mt-10">Triggered transactions</SectionTitle>
      <div className="mt-6 space-y-3">
        {data?.related_actions.map((action, i) => (
          <TransactionInfo key={i} type={action.action_type} data={action} />
        ))}
      </div>
      <Footer className="mt-[5.5rem]" />
    </div>
  )
}
