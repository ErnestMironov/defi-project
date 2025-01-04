import PointIcon from '@assets/icons/point-icon.svg'
import type { ComponentProps } from 'react'

interface WithdrawPointsBurnProperties extends ComponentProps<'div'> {
  pointsBurned: string
}

export const WithdrawPointsBurn = ({ pointsBurned }: WithdrawPointsBurnProperties) => {
  return (
    <div className="flex h-auto w-[36rem] items-center justify-center gap-[0.38rem] rounded-2xl bg-text-5 px-[1.875rem] py-4 text-center text-base leading-6">
      <span className=" text-text-80100">You will loose</span>{' '}
      <span className="flex items-center gap-1 text-red-100">
        <PointIcon className="size-5 [&_path]:fill-red-100" />
        {pointsBurned} Points
      </span>
    </div>
  )
}
