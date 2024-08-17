/* eslint-disable @typescript-eslint/no-shadow */
import { useMaatUserTokens } from '@api/queries/useMaatUserTokens'
import { ChoiceBox } from '@components/box/ChoiceBox'
import { TokenWithNetwork } from '@components/token-icon/TokenWithNetwork'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog'
import { Skeleton } from '@components/ui/skeleton'
import { formatAmountValue } from '@utils/formatValue'
import { type ComponentProps, useState } from 'react'
import type { Address } from 'viem'
import { formatUnits } from 'viem'
import { useSwitchChain } from 'wagmi'

import type { UserMTokenInfo } from '../interface'
import { useTxStore } from '../store/useTxStore'
import { useGetMTokenInfo } from './hooks/useGetMTokenInfo'

interface SelectWithdrawAssetModalProperties extends ComponentProps<'div'> {}

const WithdrawAssetItem = ({
  token,
  onChange,
}: {
  token: any
  onChange: (token: any) => void
}) => {
  const tokenData = useGetMTokenInfo(token?.asset)

  return (
    <button
      type="button"
      onClick={() =>
        onChange({
          ...token,
          ...tokenData,
        })
      }
      className="flex w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
    >
      <TokenWithNetwork
        className="size-8"
        symbol={tokenData?.stable}
        network={tokenData?.chainData?.chainId}
      />
      <div className="ml-3 flex flex-col items-start text-[1.25rem]/[1.75rem]">
        {tokenData?.symbol}
        <span className="font-[Arial] text-[0.9375rem] font-normal not-italic leading-none text-gray-80">
          {tokenData?.chainData?.name}
        </span>
      </div>
      <div className="ml-auto flex flex-col items-end gap-1">
        <p className="text-base text-text">
          {formatAmountValue(formatUnits(token.lpBalance, 6))} {tokenData?.symbol}
        </p>
        <p className="text-semi-base font-bold text-gray-80">
          ${formatAmountValue(formatUnits(token.balance, 6), 2)}{' '}
        </p>
      </div>
    </button>
  )
}

export const SelectWithdrawAssetModal = (_props: SelectWithdrawAssetModalProperties) => {
  const { mtToken, setMToken } = useTxStore()
  const [opened, setOpened] = useState(false)
  const { switchChain: _switchChain } = useSwitchChain()

  const { data, loading: isLoading } = useMaatUserTokens()
  // const tokenBalanceUsdcUsd = formatAmountValue(
  //   BigNumber((tokenBalanceUsdc as any) || 0)
  //     .div(10 ** 6)
  //     .toString(),
  // )
  // const tokenBalanceUsdtUsd = formatAmountValue(
  //   BigNumber((tokenBalanceUsdt as any) || 0)
  //     .div(10 ** 6)
  //     .toString(),
  // )

  const mtTokenData = useGetMTokenInfo(mtToken?.asset as Address)

  const onChange = (_asset: UserMTokenInfo) => {
    setMToken(_asset)
    _switchChain({
      chainId: _asset?.chainId,
    })
    setOpened(false)
  }

  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>
        <ChoiceBox
          value={mtToken?.symbol || 'Any token'}
          className="min-w-[11.5rem]"
          icon={
            <TokenWithNetwork
              className="size-[2.14288rem] max-lg:size-[1.125rem]"
              symbol={mtTokenData?.stable}
              network={mtTokenData?.chainData?.chainId}
            />
          }
        />
      </DialogTrigger>
      <DialogContent className="gap-6 text-text">
        <DialogHeader>
          <DialogTitle>Select asset</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {isLoading &&
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="flex h-[4.5rem] w-full cursor-pointer items-center rounded-xl border border-stroke-100 px-4 py-3 hover:bg-input-default"
              />
            ))}
          {data.map((token) => (
            <WithdrawAssetItem key={token?.asset} token={token} onChange={onChange} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
