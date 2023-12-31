import emptyContacts from '@/assets/empty-contacts.webp'
import emptyFavouritesContact from '@/assets/empty-favourites-contact.webp'
import styled from '@emotion/styled'
import { slate } from '@radix-ui/colors'
import Image from 'next/image'

export const EmptyContacts = () => {
  return (
    <EmptyContainer>
      <Image priority src={emptyContacts} alt="A person confused" width={200} height={200} />
      <EmptyDescription>
        Your contacts is empty.
        <br /> Add new contacts to keep your contact list organized.
      </EmptyDescription>
    </EmptyContainer>
  )
}

export const EmptyFavouritesContact = () => {
  return (
    <EmptyContainer>
      <Image
        priority
        src={emptyFavouritesContact}
        alt="A person confused"
        width={200}
        height={200}
      />
      <EmptyDescription>
        Favorites list is empty.
        <br /> Add contacts to access them quickly!
      </EmptyDescription>
    </EmptyContainer>
  )
}

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const EmptyDescription = styled.div`
  font-size: 0.875rem;
  color: ${slate.slate11};
  text-align: center;
`
