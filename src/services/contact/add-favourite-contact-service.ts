import { getContactsQueryKey } from "@/data/contact"
import { makePersistedVar } from "@/utils/apollo"
import { useApolloClient, useReactiveVar } from "@apollo/client"

const FAVOURITE_CONTACTS_KEY = 'favourite-contacts'
export const favouriteContactsVar = makePersistedVar<Array<number>>([], FAVOURITE_CONTACTS_KEY)

export const useAddFavouriteContact = () => {
  const client = useApolloClient()
  const contacts = useReactiveVar(favouriteContactsVar)

  const addFavouriteContact = (favouriteId: number) => {
    favouriteContactsVar([favouriteId, ...contacts])
    client.refetchQueries({ include: [getContactsQueryKey] })
  }

  const removeFavouriteContact = (favouriteId: number) => {
    favouriteContactsVar(contacts.filter(contactId => contactId !== favouriteId))
    client.refetchQueries({ include: [getContactsQueryKey] })
  }

  return { contacts, addFavouriteContact, removeFavouriteContact }
}