import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'

import { globalStyles } from '@/styles/global'

const cache = createCache({ key: 'next' })

const App = ({ Component, pageProps }: AppProps) => (
  <CacheProvider value={cache}>
    {globalStyles}
    <NextNProgress
      color="#74B1DE"
      startPosition={0.3}
      height={4}
      stopDelayMs={80}
      options={{ easing: 'ease-out', speed: 400 }}
    />
    <Component {...pageProps} />
  </CacheProvider>
)

export default App
