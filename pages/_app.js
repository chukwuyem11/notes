import '../styles/globals.css'
import {QueryClient, QueryClientProvider} from "react-query"
import { SessionProvider } from "next-auth/react"


function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  const queryClient = new QueryClient()

  return (
    <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>
  <Component {...pageProps} /></QueryClientProvider></SessionProvider>)
}

export default MyApp
