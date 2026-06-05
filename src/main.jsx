import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from './App.jsx'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    }
  }
})

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
)
