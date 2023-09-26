import { GetContactsQuery } from "@/gql/graphql"

const getContactKey = 'contacts'

export const getContacts = (): GetContactsQuery | null => {
  const result = window.localStorage.getItem(getContactKey)
  return result ? JSON.parse(result) : null
}
export const saveContacts = (data: GetContactsQuery) => window.localStorage.setItem(getContactKey, JSON.stringify(data))

