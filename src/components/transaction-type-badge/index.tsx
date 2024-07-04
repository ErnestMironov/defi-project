import { ActionType } from '@codegen/graphql'
import { cn } from '@utils/cn'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'

import BridgeIcon from './icons/bridge.svg'
import DepositIcon from './icons/deposit.svg'
import WithdrawIcon from './icons/withdraw.svg'

type BadgeData = {
  text: string
  icon: ReactNode
  bgColor: string
  textColor: string
}

function useBadgeData(action: ActionType) {
  const [BadgeData, setBadgeData] = useState<BadgeData>()

  useEffect(() => {
    switch (action) {
      case ActionType.Deposit:
      case ActionType.DepositInStrategy: {
        setBadgeData({
          text: 'Deposit',
          bgColor: '#79DEC226',
          textColor: '#79DEC2',
          icon: <DepositIcon />,
        })
        break
      }
      case ActionType.Withdraw:
      case ActionType.WithdrawFromStrategy: {
        setBadgeData({
          text: 'Withdraw',
          bgColor: '#6A97FF26',
          textColor: '#6A97FF',
          icon: <WithdrawIcon />,
        })
        break
      }
      case ActionType.WithdrawRequestFulfillment: {
        setBadgeData({
          text: 'Draw Out',
          bgColor: '#AAA9C926',
          textColor: '#AAA9C9',
          icon: <WithdrawIcon className="[&_path]:fill-[#AAA9C9]" />,
        })
        break
      }
      case ActionType.Bridge: {
        setBadgeData({
          text: 'Bridge',
          bgColor: '#8763F326',
          textColor: '#8763F3',
          icon: <BridgeIcon />,
        })
        break
      }
      default: {
        setBadgeData({
          text: 'Unknown',
          bgColor: '#FF000026',
          textColor: '#FF0000',
          icon: <div>?</div>,
        })
      }
    }
  }, [action])

  return BadgeData
}

export const ActionChip = ({ type }: { type: ActionType }) => {
  const data = useBadgeData(type)

  return (
    <div
      className={cn(
        'inline-flex lg:pl-4 lg:pr-5 lg:py-3 items-center gap-3 rounded-2xl bg-blue-15 lg:text-[1.125rem] leading-[140%] uppercase text-[0.875rem] pl-4 pr-5 py-2',
      )}
      style={{ backgroundColor: data?.bgColor, color: data?.textColor }}
    >
      {data?.icon}
      {data?.text}
    </div>
  )
}
