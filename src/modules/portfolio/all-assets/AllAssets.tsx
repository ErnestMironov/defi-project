import { useUserShares } from '@api/contracts/useGetUserShares'
import type { ITokenData } from '@api/tokens-balance/use-tokens-balance'
import type { OptionType } from '@components/select/Select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { cn } from '@utils/cn'
import { type ComponentProps } from 'react'

import { ChainsList } from '../components/Chains/ChainList'
import TokensList from '../components/Tokens/TokenList'
import { AssetItemSkeleton } from './AssetItem'
import { EmptyState } from './EmptyState'
import { useAllAssets } from './useAllAssets'
import { useActiveAccount } from '@hooks/useActiveAccount'

interface AllAssetsProperties extends ComponentProps<'div'> {}

const LoadingState = () => (
  <div className="flex flex-col gap-6 overflow-auto">
    {Array.from({ length: 4 }).map((_, i) => (
      <AssetItemSkeleton key={i} />
    ))}
  </div>
)

const EmptyStateView = () => <EmptyState />

const AssetsTabs = ({
  tokens,
  potentialUsdProfit,
}: {
  tokens: ITokenData[]
  potentialUsdProfit: string
}) => (
  <Tabs defaultValue="tokens" className="">
    <TabsList className="w-full justify-start gap-4 border-b border-stroke-100 px-6 max-md:px-4">
      <TabsTrigger
        variant="unstyled"
        value="tokens"
        className="py-3  text-md  text-text-2100 hover:text-text-60 data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:!text-main-100 max-md:text-sm max-md:leading-6"
      >
        Tokens
      </TabsTrigger>
      <TabsTrigger
        value="chains"
        variant="unstyled"
        className=" py-3 text-md text-text-2100  hover:text-text-60 data-[state='active']:border-b-2 data-[state='active']:border-b-main-100 data-[state='active']:!text-main-100 max-md:text-sm max-md:leading-6"
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
)

export const AllAssets = (props: AllAssetsProperties) => {
  const { className, ...rest } = props
  const chains: OptionType[] = []
  const { tokens, isLoading, potentialUsdProfit } = useAllAssets(chains)
  const { address } = useActiveAccount()
  const { data: userShares } = useUserShares(address)

  const hasDeposits = userShares?.shares && userShares.shares.length > 0
  const hasWalletTokens = tokens && tokens.length > 0

  if (isLoading) {
    return <LoadingState />
  }

  if (!hasDeposits && !hasWalletTokens) {
    return <EmptyStateView />
  }

  return (
    <div className={cn('', className)} {...rest}>
      <AssetsTabs tokens={tokens} potentialUsdProfit={potentialUsdProfit} />
    </div>
  )
}
