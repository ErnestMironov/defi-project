import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { queryClient } from '@configs/r-query'
import { Web3ModalProvider } from '@configs/Web3ModalProvider'
import { ThemeProvider } from '@modules/theme/ThemeProvider'
import { router } from '@routes/router.config'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'

const GRAPHQL_URL = 'https://lumos-labs.squids.live/maat/v/v1/graphql'

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ApolloProvider client={client}>
          <Web3ModalProvider>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
            </QueryClientProvider>
          </Web3ModalProvider>
        </ApolloProvider>
      </ThemeProvider>
      <Toaster />
    </>
  )
}

export default App
