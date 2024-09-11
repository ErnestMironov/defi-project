import TagRight from '@assets/icons/tag-right.svg'
import { CopyButton } from '@components/copy/CopyButton'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'

export const TransactionHeader = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { txHash } = useParams()
  const { isBelowDesktop } = useDeviceWidth()
  if (isBelowDesktop) {
    return <TransactionHeaderMobile {...props} />
  }
  return (
    <div className={cn('mt-[4.5rem] flex', className)} {...rest}>
      <TagRight className="size-10" />
      <div className="ml-4 flex flex-col gap-3">
        <h2 className="text-2.5xl/[2.1rem] uppercase">Deposit</h2>
        <p className="flex items-center text-xl/[1.925rem] text-gray-100">
          Intention ID {shortenAddress(txHash ?? '')}
          <CopyButton className="ml-3 inline-block" text={txHash ?? ''} />
        </p>
      </div>
    </div>
  )
}

export const TransactionHeaderMobile = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { txHash } = useParams()

  return (
    <div className={cn('mt-8', className)} {...rest}>
      <div className="flex items-center gap-4">
        <TagRight className="size-7" />
        <h2 className="text-2xl/[0rem] uppercase">Deposit</h2>
      </div>
      <p className="mt-3 flex items-center text-base text-gray-100">
        Intention ID {shortenAddress(txHash ?? '')}
        <CopyButton className="ml-3 inline-block" text={txHash ?? ''} />
      </p>
    </div>
  )
}
