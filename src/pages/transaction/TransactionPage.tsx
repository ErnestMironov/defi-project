import type { Action } from '@api/maat-finance/types'
import { useGetTransactionInfo } from '@api/maat-finance/useGetTransactionInfo'
import ArrowLeft from '@assets/icons/arrow-left.svg'
import { MAIN_ACTION_TYPE } from '@constants/action-type'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'
import { type ComponentProps, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Address } from 'viem'

import {
  TransactionInfo,
  TransactionInfoSkeletonDesktop,
  TransactionInfoSkeletonMobile,
} from './transaction-info/TransactionInfo'

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
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionPageMobile {...props} />
  }
  return <TransactionPageDesktop {...props} />
}

export const TransactionPageDesktop = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
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

  if (isLoading) {
    return (
      <div className={cn('mt-[4.5rem]', className)} {...rest}>
        <div className="mx-auto w-[60vw] space-y-8">
          <button
            type="button"
            className="mt-16 flex items-center gap-1 text-[1.25rem]/[2rem] font-medium text-text-260"
            onClick={() => navigate(-1)}
          >
            <div className="flex size-6 items-center justify-center">
              <ArrowLeft className="size-3" />
            </div>
            <span>Back to Events</span>
          </button>
          <TransactionInfoSkeletonDesktop />
          <TransactionInfoSkeletonDesktop />
          <TransactionInfoSkeletonDesktop />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('mt-[4.5rem] mb-[11.5rem]', className)} {...rest}>
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
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return (
      <div className={cn('mt-[1.63rem] mb-[5.63rem]', className)} {...rest}>
        <div className="mt-4 space-y-4">
          <button
            type="button"
            className="flex items-center gap-1 text-lg/[1.35rem] text-text-260"
            onClick={() => navigate(-1)}
          >
            <div className="flex size-6 items-center justify-center">
              <ArrowLeft className="size-3" />
            </div>
            <span>Back to Events</span>
          </button>
          <TransactionInfoSkeletonMobile />
          <TransactionInfoSkeletonMobile />
          <TransactionInfoSkeletonMobile />
        </div>
      </div>
    )
  }

  return (
    <div className={cn('mt-[1.63rem] mb-[5.63rem]', className)} {...rest}>
      <div>
        <button
          type="button"
          className="mt-4 flex items-center gap-1 text-lg/[1.35rem] text-text-260"
          onClick={() => navigate(-1)}
        >
          <div className="flex size-6 items-center justify-center">
            <ArrowLeft className="size-3" />
          </div>
          <span>Back to Events</span>
        </button>
        <TransactionInfo
          className="mt-4"
          type={mainAction?.action_type}
          data={mainAction}
          withoutRelated={relatedActions.length === 0}
        />
        {relatedActions?.length > 0 && (
          <div className="mt-4 space-y-4">
            {relatedActions.map((action, i) => (
              <TransactionInfo key={i} type={action.action_type} data={action} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
