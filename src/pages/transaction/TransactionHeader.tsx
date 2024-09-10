import { useGetTransactionInfo } from '@api/maat-finance/useGetTransactionInfo'
import TagRight from '@assets/icons/tag-right.svg'
import { CopyButton } from '@components/copy/CopyButton'
import useDeviceWidth from '@hooks/common/useDeviceWidth'
import { cn } from '@utils/cn'
import { shortenAddress } from '@utils/transform'
import type { ComponentProps } from 'react'
import { useParams } from 'react-router-dom'
import type { Address } from 'viem'

export const TransactionHeader = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { tx_hash } = useParams()
  const { data } = useGetTransactionInfo(tx_hash as Address)
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
          Intention ID {shortenAddress(data?.action?.intention_id ?? '')}
          <CopyButton
            className="ml-3 inline-block"
            text={data?.action?.intention_id ?? ''}
          />
        </p>
      </div>
    </div>
  )
}

export const TransactionHeaderMobile = (props: ComponentProps<'div'>) => {
  const { className, ...rest } = props
  const { tx_hash } = useParams()
  const { data } = useGetTransactionInfo(tx_hash as Address)

  return (
    <div className={cn('mt-8', className)} {...rest}>
      <div className="flex items-center gap-4">
        <TagRight className="size-7" />
        <h2 className="text-2xl/[0rem] uppercase">Deposit</h2>
      </div>
      <p className="mt-3 flex items-center text-base text-gray-100">
        Intention ID {shortenAddress(data?.action?.intention_id ?? '')}
        <CopyButton
          className="ml-3 inline-block"
          text={data?.action?.intention_id ?? ''}
        />
      </p>
    </div>
  )
}
