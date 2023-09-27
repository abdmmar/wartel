import {
  CreateContactMutationOptions,
  getContactsQueryKey,
  useCreateContactMutation,
} from '@/data/contact'
import { CreateContactMutationVariables } from '@/gql/graphql'
import { useApolloClient } from '@apollo/client'

export const useCreateContact = (options?: CreateContactMutationOptions) => {
  const client = useApolloClient()
  const [mutate, rest] = useCreateContactMutation(options)

  const createContact = async (input: CreateContactMutationVariables) => {
    try {
      const result = await mutate({
        variables: input,
        refetchQueries: [getContactsQueryKey], // TODO: use optimistic update
      })
      return result
    } catch (error) {
      throw new Error('Failed to create the contact. Please try again later')
    }
  }

  return { createContact, ...rest }
}
