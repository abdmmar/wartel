import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { jade, slate, yellow } from '@radix-ui/colors'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  HiDotsVertical,
  HiOutlinePencil,
  HiOutlineStar,
  HiOutlineTrash,
  HiStar,
} from 'react-icons/hi'

type ContactProps = {
  contact: {
    id: number
    first_name: string
    last_name: string
    phones: Array<{ number: string }>
    isFavourite: boolean
  }
  onClickFavourite: (favouriteId: number) => void
}

export const Contact = ({ contact, onClickFavourite }: ContactProps) => {
  const name = `${contact.first_name} ${contact.last_name}`
  const initialName = `${contact.first_name[0].toUpperCase()}${contact.last_name[0].toUpperCase()}`

  return (
    <ContactItem key={contact.id}>
      <Avatar name={name}>{initialName}</Avatar>
      <ContactItemContent>
        <ContactItemInfo>
          <ContactItemInfoName>{name}</ContactItemInfoName>
          <ContactItemInfoPhoneNumber>{contact.phones[0].number}</ContactItemInfoPhoneNumber>
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
                  <HiOutlinePencil style={{ width: '1rem', height: '1rem' }} /> <span>Edit</span>
                </DropdownMenuItemContent>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenuItemContent>
                  <HiOutlineTrash style={{ width: '1rem', height: '1rem' }} /> <span>Remove</span>
                </DropdownMenuItemContent>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onClickFavourite(contact.id)}>
                <DropdownMenuItemContent>
                  {contact.isFavourite ? (
                    <HiOutlineStar
                      style={{ width: '1rem', height: '1rem', color: slate.slate10 }}
                    />
                  ) : (
                    <HiStar style={{ width: '1rem', height: '1rem', color: yellow.yellow10 }} />
                  )}
                  <span>{contact.isFavourite ? 'Unfavourite' : 'Favourite'}</span>
                </DropdownMenuItemContent>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </ContactItemContent>
    </ContactItem>
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
