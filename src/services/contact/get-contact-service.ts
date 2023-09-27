import { GetContactsQueryOptions, useGetContactsQuery } from '@/data/contact'
import { Order_By } from '@/gql/graphql'
import { makeVar, useReactiveVar } from '@apollo/client'

const LIMIT = 10
const getContactsPaginationVar = makeVar({
  initial: true,
  hasNextPage: false,
  nextPage: 1,
  total: 0,
})

export const useGetContacts = (options?: GetContactsQueryOptions) => {
  const pagination = useReactiveVar(getContactsPaginationVar);

  const { data, loading, fetchMore: fetchMore_, ...rest } = useGetContactsQuery({
    ...options, onCompleted(data) {
      if (data.contact.length === LIMIT && pagination.initial) {
        getContactsPaginationVar({
          initial: false,
          nextPage: 1,
          hasNextPage: true,
          total: data.contact.length
        })
      }
    },
  })

  const fetchMore = async (next: number) => {
    const result = await fetchMore_({
      variables: {
        offset: next * LIMIT,
        order_by: {
          created_at: Order_By.Desc,
        },
      },
    })

    if (result.data.contact.length === LIMIT) {
      getContactsPaginationVar({
        initial: false,
        nextPage: pagination.nextPage + 1,
        hasNextPage: true,
        total: pagination.total + result.data.contact.length,
      })
    } else {
      getContactsPaginationVar({
        ...pagination,
        hasNextPage: false
      })
    }

    return result.data
  }

  return { data, loading, fetchMore, pagination, ...rest }
}
