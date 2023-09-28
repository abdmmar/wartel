import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useToggle } from '@/hooks/useToggle'
import styled from '@emotion/styled'
import { slate } from '@radix-ui/colors'
import dynamic from 'next/dynamic'
import { HiDotsVertical } from 'react-icons/hi'

const ContactItemMenu = dynamic(() =>
  import('@/components/contact/contact-item-menu').then((c) => c.ContactItemMenu),
)
const ContactItemDeleteDialog = dynamic(() =>
  import('@/components/contact/contact-item-delete-dialog').then((c) => c.ContactItemDeleteDialog),
)

type ContactProps = {
  contact: {
    id: number
    first_name: string
    last_name: string
    phones: Array<{ number: string }>
    isFavourite: boolean
  }
  onClickFavourite: (favouriteId: number) => void
  onClickDelete: (id: number) => void
}

export const Contact = ({ contact, onClickFavourite, onClickDelete }: ContactProps) => {
  const [openDelete, toggleDelete] = useToggle()

  const name = `${contact.first_name} ${contact.last_name}`
  const initialName = `${contact.first_name[0]?.toUpperCase() || 'A'}${
    contact.last_name[0]?.toUpperCase() || 'A'
  }`

  return (
    <>
      <ContactItem key={contact.id}>
        <Avatar name={name}>{initialName}</Avatar>
        <ContactItemContent>
          <ContactItemInfo>
            <ContactItemInfoName>{name}</ContactItemInfoName>
            <ContactItemInfoPhoneNumber>{contact.phones[0]?.number}</ContactItemInfoPhoneNumber>
          </ContactItemInfo>
          <ContactItemMenu
            contact={contact}
            onClickDelete={toggleDelete}
            onClickFavourite={onClickFavourite}
          >
            <Button size="icon" variant="ghost" aria-label="Contact menu">
              <HiDotsVertical />
            </Button>
          </ContactItemMenu>
        </ContactItemContent>
      </ContactItem>
      {openDelete ? (
        <ContactItemDeleteDialog
          open={openDelete}
          onOpenChange={toggleDelete}
          onConfirm={() => onClickDelete(contact.id)}
        />
      ) : null}
    </>
  )
}

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
