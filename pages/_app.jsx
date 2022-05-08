import '../styles/globals.css'
import { AuthUserProvider } from '../lib/hooks/context'

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <Component {...pageProps} />
    </AuthUserProvider>
  )
}

export default MyApp
