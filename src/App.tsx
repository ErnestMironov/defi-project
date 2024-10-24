/* eslint-disable @typescript-eslint/default-param-last */
import { LIfiProvider } from '@configs/LIfiProvider'
import { queryClient } from '@configs/r-query'
import { Web3ModalProvider } from '@configs/Web3ModalProvider'
import { PendingTransactions } from '@modules/pending-transactions/PendingTransactions'
import { ThemeProvider } from '@modules/theme/ThemeProvider'
import { TxReviewModal } from '@modules/transaction-block/TxReviewModal'
import { router } from '@routes/router.config'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Web3ModalProvider>
          <QueryClientProvider client={queryClient}>
            <LIfiProvider>
              <RouterProvider router={router} />
              <PendingTransactions />
              <TxReviewModal />
            </LIfiProvider>
          </QueryClientProvider>
        </Web3ModalProvider>
      </ThemeProvider>
      <Toaster />
    </>
  )
}

export default App
