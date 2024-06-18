import { queryClient } from '@configs/r-query'
import { Web3ModalProvider } from '@configs/Web3ModalProvider'
import { ThemeProvider } from '@modules/theme/ThemeProvider'
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
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Web3ModalProvider>
      </ThemeProvider>
      <Toaster />
    </>
  )
}

export default App
