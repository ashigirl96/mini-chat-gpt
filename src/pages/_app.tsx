import type { NextPage } from 'next'
import type { AppProps, AppType } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { DefaultLayout } from '~/components/DefaultLayout'
import { trpc } from '~/utils/trpc'
import { theme } from '~/theme'
import { SaasProvider } from '@saas-ui/react'

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <SaasProvider theme={theme}>
      {getLayout(<Component {...pageProps} />)}
    </SaasProvider>
  )
}) as AppType

export default trpc.withTRPC(MyApp)
