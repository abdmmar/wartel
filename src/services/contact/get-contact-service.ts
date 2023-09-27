import { GetContactsQueryOptions, saveContacts, useGetContactsQuery } from '@/data/contact'
import { Order_By } from '@/gql/graphql'
import * as React from 'react'

export const useGetContacts = (options?: GetContactsQueryOptions) => {
  const { data, loading, fetchMore: fetchMore_, ...rest } = useGetContactsQuery(options)

  React.useEffect(() => {
    if (data) {
      saveContacts(data)
    }
  }, [data])

  const fetchMore = async (next: number) => {
    const result = await fetchMore_({
      variables: {
        offset: next * 10,
        order_by: {
          created_at: Order_By.Desc,
        },
      },
      updateQuery(previousQueryResult, options) {
        const newEntries = options.fetchMoreResult.contact
        return {
          ...options.fetchMoreResult,
          contact: previousQueryResult.contact.concat(newEntries),
        }
      },
    })

    return result.data
  }

  return { data, loading, fetchMore, ...rest }
}
