import { graphql } from "@/gql";
import { GetContactQuery, GetContactQueryVariables } from "@/gql/graphql";
import { QueryHookOptions, useQuery } from "@apollo/client";

const getContact = graphql(`
  query GetContact($id: Int!) {
    contact_by_pk(id: $id) {
      id
      first_name
      last_name
      created_at
      phones {
        number
      }
    }
  }
`)

export type GetContactQueryOptions = QueryHookOptions<GetContactQuery, GetContactQueryVariables>

export const useGetContactQuery = (options?: GetContactQueryOptions) => useQuery(getContact, options)