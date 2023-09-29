import * as React from 'react'

import { HomeSkeleton } from '@/components/ui/skeleton'
import {
  ApolloClient,
  ApolloProvider as ApolloClientProvider,
  NormalizedCacheObject,
} from '@apollo/client'
import { InMemoryCache } from '@apollo/client/core'
import { offsetLimitPagination } from '@apollo/client/utilities'
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist'

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject>>()
  const [persistor, setPersistor] = React.useState<CachePersistor<NormalizedCacheObject>>()

  React.useEffect(() => {
    async function init() {
      const cache = new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              contact: offsetLimitPagination(['distinct_on', 'order_by', 'where']),
            },
          },
        },
      })

      let newPersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      })
      await newPersistor.restore()

      setPersistor(newPersistor)
      setClient(
        new ApolloClient({
          uri: 'https://wpe-hiring.tokopedia.net/graphql',
          cache,
          connectToDevTools: process.env.NODE_ENV === 'development',
        }),
      )
    }

    init().catch(console.error)
  }, [])

  if (!client) {
    return <HomeSkeleton />
  }

  return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>
}
