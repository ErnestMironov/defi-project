import { AXELAR_SCAN_URL } from '@constants/index'
import { cn } from '@utils/cn'
import { useClient } from 'wagmi'

interface IProperties {
  txHash?: string | null
  className?: string
  type?: 'on_chain' | 'cross_chain'
}

export const InfoBlock = ({ txHash, className, type = 'cross_chain' }: IProperties) => {
  const client = useClient()
  const scanner =
    type === 'cross_chain'
      ? AXELAR_SCAN_URL
      : `${client?.chain?.blockExplorers?.default?.url}/tx/`

  return (
    <div
      className={cn(
        'w-full rounded-2xl bg-input-default px-4 py-6 font-[Arial] text-base leading-[120%] text-text-80',
        className,
      )}
    >
      Monitor your transaction on
      <a
        target="_blank"
        href={`${scanner}${txHash}`}
        className="text-text-50"
        rel="noreferrer"
      >
        {' '}
        {scanner}
      </a>
    </div>
  )
}
