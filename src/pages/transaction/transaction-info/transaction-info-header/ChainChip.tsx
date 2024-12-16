import { TokenIconComponent } from '@components/token-icon'
import { CHAIN_NAMES_BY_ID } from '@constants/chains'
import { cn } from '@utils/cn'
import type { ComponentProps } from 'react'

export const CHAIN_COLORS_BY_ID = {
  1: { text: '#6B8AFF', bg: '#6B8AFF26' },
  10: { text: '#FF0420', bg: '#FF042026' },
  42_161: { text: '#12AAFF', bg: '#12AAFF26' },
  137: { text: '#7E3EE2', bg: '#7E3EE226' },
  43_114: { text: '#E84142', bg: '#E8414226' },
  8453: { text: '#0052FF', bg: '#0052FF26' },
  5000: { text: '#000000', bg: '#0000001A' },
  56: { text: '#F0B90B', bg: '#F0B90B26' },
  1088: { text: '#00DACC', bg: '#00DACC26' },
  2222: { text: '#000000', bg: '#00000026' },
  8217: { text: '#000000', bg: '#00000026' },
  8822: { text: '#000000', bg: '#00000026' },
  1_380_012_617: { text: '#000000', bg: '#00000026' },
  14: { text: '#000000', bg: '#00000026' },
  1625: { text: '#000000', bg: '#00000026' },
  167_000: { text: '#000000', bg: '#00000026' },
  1329: { text: '#A01F1B', bg: '#A01F1B26' },
  534_352: { text: '#000000', bg: '#00000026' },
  1_313_161_554: { text: '#000000', bg: '#00000026' },
} as const

interface ChainChipProperties extends ComponentProps<'div'> {
  chainId: number
}

export const ChainChip = (props: ChainChipProperties) => {
  const { className, chainId, ...rest } = props
  return (
    <div
      className={cn(
        'relative w-fit pr-1.5 pl-0.5 capitalize gap-0.5 flex items-center rounded-[0.375rem]',
        className,
      )}
      {...rest}
      style={{
        backgroundColor:
          CHAIN_COLORS_BY_ID[chainId as keyof typeof CHAIN_COLORS_BY_ID]?.bg,
      }}
    >
      <TokenIconComponent symbol={chainId} className="size-6" />
      <p
        className="text-sm/[1.5rem]"
        style={{
          color: CHAIN_COLORS_BY_ID[chainId as keyof typeof CHAIN_COLORS_BY_ID]?.text,
        }}
      >
        {CHAIN_NAMES_BY_ID[chainId as keyof typeof CHAIN_NAMES_BY_ID]}
      </p>
    </div>
  )
}
