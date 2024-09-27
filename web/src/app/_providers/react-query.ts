
import { QueryClient, type QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'


export default function Provider({children}: {children: ReactNode}) {
  const queryClient = new QueryClient()

  return(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
    
  )
}
