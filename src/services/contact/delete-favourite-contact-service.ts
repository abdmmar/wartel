import { PAGINATION_DEFAULT_VALUE } from '@/constants'
import {
  DeleteContactMutationOptions,
  getContactsQueryKey,
  useDeleteContactMutation
} from '@/data/contact'
import { getContactsPaginationVar, getFavContactsPaginationVar } from '@/services/contact'

export const useDeleteContact = (options?: DeleteContactMutationOptions) => {
  const [mutate, rest] = useDeleteContactMutation(options)

  const deleteContact = async (id: number) => {
    try {
      const result = await mutate({
        variables: {
          id
        },
        refetchQueries: [getContactsQueryKey],
      })

      if (result.data) {
        getContactsPaginationVar(PAGINATION_DEFAULT_VALUE)
        getFavContactsPaginationVar(PAGINATION_DEFAULT_VALUE)
      }

      return result
    } catch (error) {
      throw new Error('Failed to delete the contact. Please try again later')
    }
  }

  return { deleteContact, ...rest }
}
