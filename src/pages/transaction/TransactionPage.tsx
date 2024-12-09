import type { Action } from '@api/maat-finance/types'
import { useGetTransactionInfo } from '@api/maat-finance/useGetTransactionInfo'
import ArrowLeft from '@assets/icons/arrow-left.svg'
import { SectionTitle } from '@components/section/SectionTitle'
import { MAIN_ACTION_TYPE } from '@constants/action-type'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { Footer } from '@layouts/footer/Footer'
import { cn } from '@utils/cn'
import { type ComponentProps, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Address } from 'viem'

import { TransactionInfo } from './transaction-info/TransactionInfo'
import { TransactionHeader } from './TransactionHeader'

function detectMainActionType(action: Action) {
  return action.action_type in MAIN_ACTION_TYPE
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
  const { data, isLoading } = useGetTransactionInfo(tx_hash as Address)
  const navigate = useNavigate()
  const [mainAction, setMainAction] = useState<Action | undefined>(undefined)
  const [relatedActions, setRelatedActions] = useState<Action[]>([])

  useEffect(() => {
    if (!data) return
    const [action, ...restActions] = data
    setMainAction(action)
    if (restActions?.length === 0 || !restActions) {
      setRelatedActions(restActions)
      return
    }

    if (detectMainActionType(action)) {
      setMainAction(action)
      setRelatedActions(sortActionsByDate([...restActions]))
      return
    }

    const mainActionIndex = findMainActionIndex(restActions)
    setMainAction(restActions[mainActionIndex])
    setRelatedActions(
      sortActionsByDate([...restActions.filter((_, i) => i !== mainActionIndex), action]),
    )
  }, [data])

  if (isBelowDesktop) {
    return <TransactionPageMobile {...props} />
  }

  if (isLoading || !mainAction) {
    return (
      <div className={cn('mt-[4.5rem]', className)} {...rest}>
        <div className="mx-auto w-[60vw] space-y-8">
          <button
            type="button"
            className="mt-16 flex items-center gap-1 text-[1.25rem]/[2rem] font-medium text-text-2100"
            onClick={() => navigate(-1)}
          >
            <div className="flex size-6 items-center justify-center">
              <ArrowLeft className="size-3" />
            </div>
            <span>Back to Events</span>
          </button>
          <TransactionInfo isLoading type="DEPOSIT" />
          <TransactionInfo isLoading type="DEPOSIT" />
          <TransactionInfo isLoading />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('mt-[4.5rem]', className)} {...rest}>
      <div className="mx-auto w-[60vw]">
        <button
          type="button"
          className="mt-16 flex items-center gap-1 text-[1.25rem]/[2rem] font-medium text-text-2100"
          onClick={() => navigate(-1)}
        >
          <div className="flex size-6 items-center justify-center">
            <ArrowLeft className="size-3" />
          </div>
          <span>Back to Events</span>
        </button>
        <TransactionInfo
          isLoading={isLoading}
          className="mt-8"
          type={mainAction?.action_type}
          data={mainAction}
          withoutRelated={relatedActions.length === 0}
        />
        {relatedActions?.length > 0 && (
          <div className="mt-8 space-y-4">
            {relatedActions.map((action, i) => (
              <TransactionInfo key={i} type={action.action_type} data={action} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export const TransactionPageMobile = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { tx_hash } = useParams()
  const { data, isLoading } = useGetTransactionInfo(tx_hash as Address)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading || !data) {
    return (
      <div className={cn('mt-8', className)} {...rest}>
        <TransactionHeader isLoading className="mt-10" />
        <TransactionInfo isLoading className="mt-10" type="DEPOSIT" />
        <SectionTitle className="mt-[4.44rem]">Triggered transactions</SectionTitle>
        <div className="mt-8 space-y-4">
          <TransactionInfo isLoading />
          <TransactionInfo isLoading />
          <TransactionInfo isLoading />
        </div>
        <Footer className="mt-[7.5rem]" />
      </div>
    )
  }
  return (
    <div className={cn('mt-8', className)} {...rest}>
      <TransactionHeader />
      <TransactionInfo className="mt-6" type={data?.[0]?.action_type} data={data?.[0]} />
      <SectionTitle className="mt-10">Triggered transactions</SectionTitle>
      <div className="mt-6 space-y-3">
        {data?.map((action, i) => (
          <TransactionInfo key={i} type={action.action_type} data={action} />
        ))}
      </div>
      <Footer className="mt-[5.5rem]" />
    </div>
  )
}
