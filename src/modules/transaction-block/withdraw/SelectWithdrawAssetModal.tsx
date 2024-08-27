/* eslint-disable @typescript-eslint/no-shadow */
import type { ParsedSharesBalanceResponse } from '@api/maat-finance/types'
import { useGetSharesBalance } from '@api/maat-finance/useGetSharesBalance'
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
import { formatUnits } from 'viem'
import { useAccount, useSwitchChain } from 'wagmi'

import { useTxStore } from '../store/useTxStore'
import type { UseGetMTokenInfoReturn } from './hooks/useGetMTokenInfo'
import { useGetMTokenInfo } from './hooks/useGetMTokenInfo'

interface SelectWithdrawAssetModalProperties extends ComponentProps<'div'> {}

const WithdrawAssetItem = ({
  token,
  onChange,
}: {
  token: ParsedSharesBalanceResponse['balances'][number]
  onChange: (token: UseGetMTokenInfoReturn) => void
}) => {
  const tokenData = useGetMTokenInfo(token)

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
        {tokenData?.stable.toUpperCase()}
        <span className="font-[Arial] text-[0.9375rem] font-normal not-italic leading-none text-gray-80">
          {tokenData?.chainData?.name}
        </span>
      </div>
      <div className="ml-auto flex flex-col items-end gap-1">
        <p className="text-base text-text">
          {formatAmountValue(formatUnits(BigInt(token.value), 6))}{' '}
          {tokenData?.stable.toUpperCase()}
        </p>
        <p className="text-semi-base font-bold text-gray-80">
          ${formatAmountValue(formatUnits(BigInt(token.value), 6), 2)}{' '}
        </p>
      </div>
    </button>
  )
}

export const SelectWithdrawAssetModal = (_props: SelectWithdrawAssetModalProperties) => {
  const { mtToken, setMToken } = useTxStore()
  const [opened, setOpened] = useState(false)
  const { switchChain: _switchChain } = useSwitchChain()
  const { address } = useAccount()

  const { data, isLoading, error } = useGetSharesBalance(address)

  const balances = data?.data?.balances.filter((token) => token.value > 0)
  console.log('🚀 ~ SelectWithdrawAssetModal ~ balances:', balances)

  const onChange = (_asset: UseGetMTokenInfoReturn) => {
    setMToken(_asset)
    if (_asset?.chainData?.chainId) {
      _switchChain({
        chainId: _asset?.chainData?.chainId,
      })
    }
    setOpened(false)
  }

  return (
    <Dialog open={opened} onOpenChange={() => setOpened(!opened)}>
      <DialogTrigger>
        <ChoiceBox
          value={mtToken?.symbol || 'Any token'}
          className="min-w-[10.5rem]"
          icon={
            <TokenWithNetwork
              className="size-[2.14288rem] max-lg:size-[1.125rem]"
              symbol={mtToken?.stable}
              network={mtToken?.chainData?.chainId}
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
          {balances?.map((token) => (
            <WithdrawAssetItem key={token?.chain} token={token} onChange={onChange} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
