/* eslint-disable @typescript-eslint/default-param-last */
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { queryClient } from '@configs/r-query'
import { Web3ModalProvider } from '@configs/Web3ModalProvider'
import { PendingTransactions } from '@modules/pending-transactions/PendingTransactions'
import { ThemeProvider } from '@modules/theme/ThemeProvider'
import { TxReviewModal } from '@modules/transaction-block/TxReviewModal'
import { router } from '@routes/router.config'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'

const GRAPHQL_URL = 'https://lumos-labs.squids.live/maat/v/v1/graphql'

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          maatActionsConnection: relayStylePagination([
            ['where', ['token']],
            'first',
            // 'after',
          ]),
        },
      },
    },
  }),
})

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ApolloProvider client={client}>
          <Web3ModalProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <PendingTransactions />
              <TxReviewModal />
            </QueryClientProvider>
          </Web3ModalProvider>
        </ApolloProvider>
      </ThemeProvider>
      <Toaster />
    </>
  )
}

export default App
