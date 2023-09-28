import { PAGINATION_DEFAULT_VALUE } from "@/constants"
import { getContactsQueryKey } from "@/data/contact"
import { getContactsPaginationVar, getFavContactsPaginationVar } from "@/services/contact"
import { makePersistedVar } from "@/utils/apollo"
import { useApolloClient, useReactiveVar } from "@apollo/client"

const FAVOURITE_CONTACTS_KEY = 'favourite-contacts'
export const favouriteContactsVar = makePersistedVar<Array<number>>([], FAVOURITE_CONTACTS_KEY)

export const useAddFavouriteContact = () => {
  const client = useApolloClient()
  const contacts = useReactiveVar(favouriteContactsVar)

  const addFavouriteContact = (favouriteId: number) => {
    favouriteContactsVar([favouriteId, ...contacts])

    getFavContactsPaginationVar(PAGINATION_DEFAULT_VALUE)
    getContactsPaginationVar(PAGINATION_DEFAULT_VALUE)

    client.refetchQueries({ include: [getContactsQueryKey] })
  }

  const removeFavouriteContact = (favouriteId: number) => {
    favouriteContactsVar(contacts.filter(contactId => contactId !== favouriteId))

    getFavContactsPaginationVar(PAGINATION_DEFAULT_VALUE)
    getContactsPaginationVar(PAGINATION_DEFAULT_VALUE)

    client.refetchQueries({ include: [getContactsQueryKey] })
  }

  return { contacts, addFavouriteContact, removeFavouriteContact }
}