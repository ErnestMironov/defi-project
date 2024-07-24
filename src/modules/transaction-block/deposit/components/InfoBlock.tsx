import { ARBITRUM_SCAN_URL, AXELAR_SCAN_URL } from '@constants/index'
import { cn } from '@utils/cn'

interface IProperties {
  txHash?: string | null
  className?: string
  type?: 'crossChain' | 'onChain'
}

export const InfoBlock = ({ txHash, className, type = 'crossChain' }: IProperties) => {
  const scanner = type === 'crossChain' ? AXELAR_SCAN_URL : ARBITRUM_SCAN_URL

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
