import { PAGINATION_DEFAULT_VALUE } from '@/constants'
import {
  CreateContactMutationOptions,
  getContactsQueryKey,
  useCreateContactMutation
} from '@/data/contact'
import { CreateContactMutationVariables } from '@/gql/graphql'
import { getContactsPaginationVar } from '@/services/contact'

export const useCreateContact = (options?: CreateContactMutationOptions) => {
  const [mutate, rest] = useCreateContactMutation(options)

  const createContact = async (input: CreateContactMutationVariables) => {
    try {
      const result = await mutate({
        variables: input,
        refetchQueries: [getContactsQueryKey],
      })

      if (result.data) {
        getContactsPaginationVar(PAGINATION_DEFAULT_VALUE)
      }

      return result
    } catch (error) {
      throw new Error('Failed to create the contact. Please try again later')
    }
  }

  return { createContact, ...rest }
}
