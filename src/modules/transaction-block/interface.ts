import type { MaatUserTokensQuery } from '@codegen/graphql'

import type { IMToken } from './withdraw/hooks/useGetMTokenInfo'

export type UserMTokenInfo = IMToken & MaatUserTokensQuery['maatUserStats']['balances'][0]
