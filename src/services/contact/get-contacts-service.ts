import { PAGINATION_DEFAULT_VALUE, PAGINATION_LIMIT } from '@/constants'
import { GetContactsQueryOptions, useGetContactsQuery } from '@/data/contact'
import { Order_By } from '@/gql/graphql'
import { favouriteContactsVar } from '@/services/contact/add-favourite-contact-service'
import { makeVar, useReactiveVar } from '@apollo/client'

export const getContactsPaginationVar = makeVar(PAGINATION_DEFAULT_VALUE)

export const useGetContacts = (options?: GetContactsQueryOptions) => {
  const pagination = useReactiveVar(getContactsPaginationVar);
  const favouriteContacts = useReactiveVar(favouriteContactsVar)

  const { data, loading, fetchMore: fetchMore_, ...rest } = useGetContactsQuery({
    variables: {
      where: {
        _not: {
          id: {
            _in: favouriteContacts
          }
        }
      }
    },
    onCompleted(data) {
      if (data.contact.length === PAGINATION_LIMIT && pagination.initial) {
        getContactsPaginationVar({
          initial: false,
          nextPage: 1,
          hasNextPage: true,
          total: data.contact.length
        })
      }
    },
    ...options,
  })

  const fetchMore = async (next: number) => {
    const result = await fetchMore_({
      variables: {
        offset: next * PAGINATION_LIMIT,
        order_by: {
          created_at: Order_By.Desc,
        },
      },
    })

    if (result.data.contact.length === PAGINATION_LIMIT) {
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
