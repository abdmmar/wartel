/** @jsxImportSource @emotion/react */

import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { EmptyContacts, EmptyFavouritesContact } from '@/components/empty-state'
import { Input } from '@/components/input'
import { useGetContacts } from '@/services/contact'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { jade, slate } from '@radix-ui/colors'
import { HiDotsVertical, HiPlus } from 'react-icons/hi'

export default function Home() {
  const { data } = useGetContacts()
  const favourites = []

  return (
    <Main>
      <Header>
        <H1>Phone</H1>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `}
        >
          <Input placeholder="Search contact" />
          <Button size="icon">
            <HiPlus style={{ width: '1rem', height: '1rem', color: jade.jade11 }} />
          </Button>
        </div>
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
                <Button
                  size="icon"
                  css={css`
                    border: none;
                  `}
                >
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
`
const ContactItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background-color: ${slate.slate1};
  border: 1px solid ${slate.slate3};
  border-radius: 4px;
`
const ContactItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-left: 1rem;
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
`
const ContactItemInfoPhoneNumber = styled.small`
  font-size: 0.75 rem;
  color: ${slate.slate11};
`
