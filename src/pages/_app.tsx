import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { AppProps } from 'next/app'

import { globalStyles } from '@/styles/global'

const cache = createCache({ key: 'next' })

const App = ({ Component, pageProps }: AppProps) => (
  <CacheProvider value={cache}>
    {globalStyles}
    <Component {...pageProps} />
  </CacheProvider>
)

export default App
