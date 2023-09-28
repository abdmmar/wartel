import { PAGINATION_DEFAULT_VALUE } from '@/constants'
import {
  EditContactMutationOptions,
  getContactsQueryKey,
  useEditContactMutation
} from '@/data/contact'
import { EditContactMutationVariables } from '@/gql/graphql'
import { getContactsPaginationVar } from '@/services/contact'

export const useEditContact = (options?: EditContactMutationOptions) => {
  const [mutate, rest] = useEditContactMutation(options)

  const editContact = async (input: EditContactMutationVariables) => {
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
      throw new Error('Failed to edit the contact. Please try again later')
    }
  }

  return { editContact, ...rest }
}
