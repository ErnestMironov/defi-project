import { useQuery } from '@tanstack/react-query'

import { referralApiClient } from './referral-api-client'

function getMessageToSign() {
  return referralApiClient.get<{ message: string }>('message-to-sign')
}

export const useGetMessageToSign = () => {
  const query = useQuery({
    queryKey: ['message-to-sign'],
    queryFn: getMessageToSign,
  })

  return {
    ...query,
    messageToSign: query.data?.data.message,
  }
}
