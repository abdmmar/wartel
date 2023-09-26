import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToggle } from '@/hooks/useToggle'
import { useGetContacts } from '@/services/contact'
import styled from '@emotion/styled'
import { jade, slate } from '@radix-ui/colors'
import dynamic from 'next/dynamic'
import { HiDotsVertical, HiPlus } from 'react-icons/hi'

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
  const { data } = useGetContacts()
  const favourites = []

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
        {favourites.length === 0 ? <EmptyFavouritesContact /> : null}
      </ContactContainer>
      <ContactContainer>
        <ContactContainerTitle>All Contacts</ContactContainerTitle>
        {data?.contact.length === 0 ? <EmptyContacts /> : null}
        <ContactList>
          {data?.contact.map((contact) => (
            <ContactItem key={contact.id}>
              <Avatar
                name={`${contact.first_name} ${contact.last_name}`}
              >{`${contact.first_name[0]}${contact.last_name[0]}`}</Avatar>
              <ContactItemContent>
                <ContactItemInfo>
                  <ContactItemInfoName>
                    `${contact.first_name} ${contact.last_name}`
                  </ContactItemInfoName>
                  <ContactItemInfoPhoneNumber>
                    {contact.phones[0].number}
                  </ContactItemInfoPhoneNumber>
                </ContactItemInfo>
                <Button size="icon" variant="ghost">
                  <HiDotsVertical />
                </Button>
              </ContactItemContent>
            </ContactItem>
          ))}
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
const ContactItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  background-color: ${slate.slate1};
  border: 1px solid ${slate.slate3};
  border-radius: 4px;
`
const ContactItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 0.75rem;
`
const ContactItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
const ContactItemInfoName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${slate.slate12};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 25ch;
`
const ContactItemInfoPhoneNumber = styled.small`
  font-size: 0.75rem;
  color: ${slate.slate11};
`
