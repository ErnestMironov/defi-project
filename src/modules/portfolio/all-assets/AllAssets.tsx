import { useUserShares } from '@api/contracts/useGetUserShares'
import type { OptionType } from '@components/select/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import { type ComponentProps, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

import { ChainsList } from '../components/ChainList'
import { TokensList } from '../components/TokenList'
import { AssetItemSkeleton } from './AssetItem'
import { EmptyState } from './EmptyState'
import { NoDeposit } from './NoDeposit'
import { useAllAssets } from './useAllAssets'

interface AllAssetsProperties extends ComponentProps<'div'> {}

export const AllAssets = (props: AllAssetsProperties) => {
  const { className, ...rest } = props
  const [chains, setChains] = useState<OptionType[]>([])
  const { tokens, isLoading, potentialUsdProfit } = useAllAssets(chains)
  const { address } = useAccount()
  const { data: userShares } = useUserShares(address)

  const hasDeposits = useMemo(() => {
    return userShares?.shares && userShares.shares.length > 0
  }, [userShares])

  const hasWalletTokens = useMemo(() => {
    return tokens && tokens.length > 0
  }, [tokens])

  return (
    <div className={cn('', className)} {...rest}>
      {isLoading ? (
        <div className="flex flex-col gap-6 overflow-auto">
          {Array.from({ length: 4 }).map((_, i) => (
            <AssetItemSkeleton key={i} />
          ))}
        </div>
      ) : !hasDeposits && !hasWalletTokens ? (
        <EmptyState />
      ) : (
        <div className="">
          <NoDeposit />
          <Tabs defaultValue="tokens" className="">
            <TabsList className="w-full justify-start gap-4 border-b px-6">
              <TabsTrigger
                variant="unstyled"
                value="tokens"
                className="py-4 text-md data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:text-main-100"
              >
                Tokens
              </TabsTrigger>
              <TabsTrigger
                value="chains"
                variant="unstyled"
                className="py-4 text-md data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:text-main-100"
              >
                Chains
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tokens">
              <TokensList tokens={tokens} potentialUsdProfit={potentialUsdProfit} />
            </TabsContent>
            <TabsContent value="chains">
              <ChainsList tokens={tokens} potentialUsdProfit={potentialUsdProfit} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
