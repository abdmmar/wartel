import { graphql } from '@/gql'
import { GetContactsQuery, GetContactsQueryVariables, Order_By } from '@/gql/graphql'
import { QueryHookOptions, useLazyQuery, useQuery } from '@apollo/client'

export const getContactsQueryKey = 'GetContacts'
const GET_CONTACTS_QUERY = graphql(`
  query GetContacts(
    $distinct_on: [contact_select_column!]
    $limit: Int
    $offset: Int
    $order_by: [contact_order_by!]
    $where: contact_bool_exp
  ) {
    contact(
      distinct_on: $distinct_on
      limit: $limit
      offset: $offset
      order_by: $order_by
      where: $where
    ) {
      created_at
      id
      first_name
      last_name
      phones {
        number
      }
    }
  }
`)

export type GetContactsQueryOptions = QueryHookOptions<GetContactsQuery, GetContactsQueryVariables>

export const useGetContactsQuery = (option?: GetContactsQueryOptions) => {
  const { variables, ...options } = option || {}

  const result = useQuery(GET_CONTACTS_QUERY, {
    variables: {
      limit: 10,
      order_by: {
        created_at: Order_By.Desc,
      },
      ...variables,
    },
    ...options,
  })

  return result
}

export const useLazyGetContactsQuery = () => useLazyQuery(GET_CONTACTS_QUERY)