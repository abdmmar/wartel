import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToggle } from '@/hooks/useToggle'
import { useGetContacts } from '@/services/contact'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { jade, slate, yellow } from '@radix-ui/colors'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import dynamic from 'next/dynamic'
import { HiDotsVertical, HiOutlinePencil, HiPlus, HiStar } from 'react-icons/hi'

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
              >{`${contact.first_name[0].toUpperCase()}${contact.last_name[0].toUpperCase()}`}</Avatar>
              <ContactItemContent>
                <ContactItemInfo>
                  <ContactItemInfoName>
                    {contact.first_name} {contact.last_name}
                  </ContactItemInfoName>
                  <ContactItemInfoPhoneNumber>
                    {contact.phones[0].number}
                  </ContactItemInfoPhoneNumber>
                </ContactItemInfo>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Button size="icon" variant="ghost">
                      <HiDotsVertical />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <DropdownMenuItemContent>
                          <HiOutlinePencil style={{ width: '1.2rem', height: '1rem' }} />{' '}
                          <span>Edit</span>
                        </DropdownMenuItemContent>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <DropdownMenuItemContent>
                          <HiStar
                            style={{ width: '1.2rem', height: '1.2rem', color: yellow.yellow10 }}
                          />{' '}
                          <span>Favourite</span>
                        </DropdownMenuItemContent>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </ContactItemContent>
            </ContactItem>
          ))}
        </ContactList>
      </ContactContainer>
    </Main>
  )
}

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const DropdownMenuContent = styled(DropdownMenu.Content)`
  min-width: 120px;
  background-color: ${slate.slate1};
  border-radius: 4px;
  padding: 0.5rem;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  animation-duration: 300ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state='open'] {
    &[data-side='top'] {
      animation-name: ${slideDownAndFade};
    }
    &[data-side='right'] {
      animation-name: ${slideLeftAndFade};
    }
    &[data-side='bottom'] {
      animation-name: ${slideUpAndFade};
    }
    &[data-side='left'] {
      animation-name: ${slideRightAndFade};
    }
  }
`
const DropdownMenuItem = styled(DropdownMenu.Item)`
  font-size: 0.875rem;
  color: ${slate.slate11};
  margin-bottom: 0.5rem;
  padding: 0.2rem;
  border-radius: 2px;

  :last-child {
    margin-bottom: 0;
  }

  :hover {
    background-color: ${slate.slate3};
    color: ${jade.jade11};
  }
`
const DropdownMenuItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

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
