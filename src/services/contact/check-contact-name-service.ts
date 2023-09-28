import {
  useLazyGetContactsQuery
} from '@/data/contact'

export const useCheckContactName = () => {
  const [getContacts, rest] = useLazyGetContactsQuery()

  const isContactExists = async (input: { first_name: string, last_name: string }) => {
    try {
      const result = await getContacts({
        variables: {
          where: {
            first_name: {
              _eq: input.first_name
            },
            last_name: { _eq: input.last_name },
          }
        },
      })

      if (result.data?.contact && result.data?.contact?.length > 0) {
        return true
      }

      return false
    } catch (error) {
      throw new Error('Failed to check contact name. Please try again later')
    }
  }

  return { isContactExists, ...rest }
}
