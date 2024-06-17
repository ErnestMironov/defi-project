import { queryClient } from '@configs/r-query'
import { wagmiConfig } from '@configs/wagmi'
import { ThemeProvider } from '@modules/theme/ThemeProvider'
import { router } from '@routes/router.config'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { WagmiProvider } from 'wagmi'

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </WagmiProvider>
      </ThemeProvider>
      <Toaster />
    </>
  )
}

export default App
