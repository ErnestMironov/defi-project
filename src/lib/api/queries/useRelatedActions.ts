import { apiClient } from '@api/maat-finance/api-client'
import type { RelatedActionType } from '@api/maat-finance/types'
import { useQuery } from '@tanstack/react-query'

const getRelatedActions = (parameters: { intention_id: string }) => {
  return apiClient.get<RelatedActionType[]>('/actions/related', { params: parameters })
}

export const useRelatedActions = (intention_id?: string) => {
  return useQuery({
    queryKey: ['relatedActions'],
    queryFn: async () => {
      const { data } = await getRelatedActions({ intention_id: intention_id ?? '' })

      return data
    },
    enabled: !!intention_id,
  })
}
