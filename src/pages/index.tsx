import { Contact } from '@/components/contact/contact-item'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/loader'
import { useDebounce } from '@/hooks/useDebounce'
import { useDeleteContact, useGetContacts } from '@/services/contact'
import { useAddFavouriteContact } from '@/services/contact/add-favourite-contact-service'
import { useGetFavouriteContacts } from '@/services/contact/get-favourite-contacts-service'
import styled from '@emotion/styled'
import { jade, slate } from '@radix-ui/colors'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import * as React from 'react'
import { HiPlus } from 'react-icons/hi'
import { useInView } from 'react-intersection-observer'

const EmptyContacts = dynamic(() =>
  import('@/components/ui/empty-state').then((c) => c.EmptyContacts),
)
const EmptyFavouritesContact = dynamic(() =>
  import('@/components/ui/empty-state').then((c) => c.EmptyFavouritesContact),
)

export default function Home() {
  const [s, setSearch] = React.useState('')
  const search = useDebounce(s, 500)

  const favouriteContacts = useGetFavouriteContacts({
    notifyOnNetworkStatusChange: true,
    initialFetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      where: {
        _or: [{ first_name: { _ilike: `%${search}%` } }, { last_name: { _ilike: `%${search}%` } }],
      },
      offset: search ? 0 : undefined,
    },
  })
  const allContacts = useGetContacts({
    notifyOnNetworkStatusChange: true,
    initialFetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network',
    variables: {
      where: {
        _or: [{ first_name: { _ilike: `%${search}%` } }, { last_name: { _ilike: `%${search}%` } }],
      },
      offset: search ? 0 : undefined,
    },
  })
  const { addFavouriteContact, removeFavouriteContact } = useAddFavouriteContact()
  const { deleteContact } = useDeleteContact()

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const contactsObserver = useInView({
    onChange: async (inView) => {
      if (inView && allContacts.pagination.hasNextPage) {
        await allContacts.fetchMore(allContacts.pagination.nextPage)
      }
    },
  })

  const favouriteObserver = useInView({
    onChange: async (inView) => {
      if (inView && favouriteContacts.pagination.hasNextPage) {
        await favouriteContacts.fetchMore(favouriteContacts.pagination.nextPage)
      }
    },
  })

  return (
    <Main>
      <Header>
        <H1>Wartel</H1>

        <HeaderAction>
          <Input placeholder="Search contact" onChange={onSearch} />
          <Button asChild size="icon">
            <Link href="/form" aria-label="Add new contact">
              <HiPlus style={{ width: '1rem', height: '1rem', color: jade.jade11 }} />
            </Link>
          </Button>
        </HeaderAction>
      </Header>
      <ContactContainer>
        <ContactContainerHeader>
          <ContactContainerTitle>Favourites</ContactContainerTitle>
          <ContactContainerCount>
            {favouriteContacts.data?.contact.length || 0}
          </ContactContainerCount>
        </ContactContainerHeader>
        <div
          style={{
            minHeight: favouriteContacts.data?.contact?.length === 0 ? '200px' : 'fit-content',
          }}
        >
          {favouriteContacts.data?.contact.length === 0 ? <EmptyFavouritesContact /> : null}
          {favouriteContacts.loading === true ? (
            <Spinner>
              <p color={slate.slate11}>Fetching your contacts...</p>
            </Spinner>
          ) : null}
        </div>
        <ContactList>
          {favouriteContacts.data?.contact.map((contact) => (
            <Contact
              key={contact.id}
              contact={{ ...contact, isFavourite: true }}
              onClickFavourite={removeFavouriteContact}
              onClickDelete={deleteContact}
            />
          ))}
          <li ref={favouriteObserver.ref}>
            {favouriteObserver.inView && favouriteContacts.pagination.hasNextPage ? (
              <Spinner />
            ) : (
              <div />
            )}
          </li>
        </ContactList>
      </ContactContainer>
      <ContactContainer>
        <ContactContainerHeader>
          <ContactContainerTitle>All Contacts</ContactContainerTitle>
          <ContactContainerCount>{allContacts.data?.contact.length || 0}</ContactContainerCount>
        </ContactContainerHeader>
        <div
          style={{
            minHeight: allContacts.data?.contact?.length === 0 ? '200px' : 'fit-content',
          }}
        >
          {allContacts.data?.contact.length === 0 ? <EmptyContacts /> : null}
          {allContacts.loading === true ? (
            <Spinner>
              <p color={slate.slate11}>Fetching your contacts...</p>
            </Spinner>
          ) : null}
        </div>
        <ContactList>
          {allContacts.data?.contact.map((contact) => (
            <Contact
              key={contact.id}
              contact={{ ...contact, isFavourite: false }}
              onClickFavourite={addFavouriteContact}
              onClickDelete={deleteContact}
            />
          ))}
          <li ref={contactsObserver.ref}>
            {contactsObserver.inView && allContacts.pagination.hasNextPage ? <Spinner /> : <div />}
          </li>
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
const ContactContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`
const ContactContainerTitle = styled.h2`
  font-size: 1rem;
`
const ContactContainerCount = styled.div`
  padding: 2px 4px;
  text-align: center;
  font-variant-numeric: tabular-nums;
  min-width: 22px;
  background-color: ${slate.slate3};
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 2px;
  color: ${slate.slate11};
`
const ContactList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
