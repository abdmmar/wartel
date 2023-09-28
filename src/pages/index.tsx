import { Contact } from '@/components/contact/contact-item'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/loader'
import { useToggle } from '@/hooks/useToggle'
import { useGetContacts } from '@/services/contact'
import { useAddFavouriteContact } from '@/services/contact/add-favourite-contact-service'
import { useGetFavouriteContacts } from '@/services/contact/get-favourite-contacts-service'
import styled from '@emotion/styled'
import { jade, slate } from '@radix-ui/colors'
import dynamic from 'next/dynamic'
import { HiPlus } from 'react-icons/hi'
import { useInView } from 'react-intersection-observer'

const EmptyContacts = dynamic(() =>
  import('@/components/ui/empty-state').then((c) => c.EmptyContacts),
)
const EmptyFavouritesContact = dynamic(() =>
  import('@/components/ui/empty-state').then((c) => c.EmptyFavouritesContact),
)
const AddContactDialog = dynamic(() =>
  import('@/components/contact/add-contact-dialog').then((c) => c.AddContactDialog),
)

export default function Home() {
  const [open, toggle] = useToggle()

  const favouriteContacts = useGetFavouriteContacts({
    notifyOnNetworkStatusChange: true,
  })
  const allContacts = useGetContacts({
    notifyOnNetworkStatusChange: true,
  })
  const { addFavouriteContact, removeFavouriteContact } = useAddFavouriteContact()

  const { ref, inView } = useInView({
    onChange: async (inView) => {
      if (inView && allContacts.pagination.hasNextPage) {
        await allContacts.fetchMore(allContacts.pagination.nextPage)
      }
    },
  })

  return (
    <Main>
      <Header>
        <H1>Phone</H1>
        <HeaderAction>
          <Input placeholder="Search contact" />
          <Button size="icon" onClick={toggle}>
            <HiPlus style={{ width: '1rem', height: '1rem', color: jade.jade11 }} />
          </Button>
          {open && <AddContactDialog open={open} onOpenChange={toggle} />}
        </HeaderAction>
      </Header>
      <ContactContainer>
        <ContactContainerTitle>Favourites</ContactContainerTitle>
        {favouriteContacts.data?.contact.length === 0 ? <EmptyFavouritesContact /> : null}
        {favouriteContacts.loading === true ? (
          <Spinner>
            <p color={slate.slate11}>Fetching your contacts...</p>
          </Spinner>
        ) : null}
        <ContactList>
          {favouriteContacts.data?.contact.map((contact) => (
            <Contact
              key={contact.id}
              contact={{ ...contact, isFavourite: true }}
              onClickFavourite={removeFavouriteContact}
            />
          ))}
          <div ref={ref}>
            {inView && favouriteContacts.pagination.hasNextPage ? <Spinner /> : <div />}
          </div>
        </ContactList>
      </ContactContainer>
      <ContactContainer>
        <ContactContainerTitle>All Contacts</ContactContainerTitle>
        {allContacts.data?.contact.length === 0 ? <EmptyContacts /> : null}
        {allContacts.loading === true ? (
          <Spinner>
            <p color={slate.slate11}>Fetching your contacts...</p>
          </Spinner>
        ) : null}
        <ContactList>
          {allContacts.data?.contact.map((contact) => (
            <Contact
              key={contact.id}
              contact={{ ...contact, isFavourite: false }}
              onClickFavourite={addFavouriteContact}
            />
          ))}
          <div ref={ref}>
            {inView && allContacts.pagination.hasNextPage ? <Spinner /> : <div />}
          </div>
        </ContactList>
      </ContactContainer>
    </Main>
  )
}

const Main = styled.main`
  background-color: ${slate.slate1};
  padding: 1rem;
`
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`
const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const H1 = styled.h1`
  font-size: 1.5rem;
  color: ${jade.jade11};
`
const ContactContainer = styled.div`
  display: flex;
  padding: 0.75rem;
  background-color: ${slate.slate2};
  border-radius: 4px;
  flex-direction: column;
  margin-bottom: 1rem;

  :last-child {
    margin-bottom: 0;
  }
`
const ContactContainerTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 1rem;
`
const ContactList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
