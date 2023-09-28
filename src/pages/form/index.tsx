import { AddContactForm } from '@/components/contact/add-contact-form'
import { Button } from '@/components/ui/button'
import { AddContactSchema } from '@/schemas/contact'
import { useCheckContactName, useCreateContact } from '@/services/contact'
import styled from '@emotion/styled'
import { slate } from '@radix-ui/colors'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { HiChevronLeft } from 'react-icons/hi'

export default function CreateContactPage() {
  const router = useRouter()
  const { createContact, loading } = useCreateContact()
  const { isContactExists, loading: checkingContact } = useCheckContactName()

  const onSubmit = async (data: AddContactSchema) => {
    try {
      const isExist = await isContactExists({
        first_name: data.first_name,
        last_name: data.last_name,
      })

      if (isExist) {
        toast.error(
          'A contact with the same name already exists. Please choose a unique name for your contact.',
          { style: { minWidth: 'fit-content', fontSize: '0.875rem' } },
        )
        return
      }

      const result = await createContact(data)

      if (result.data) {
        toast.success('Contact added successfully!')
        router.push('/')
      }
    } catch (error) {
      toast.error((error as Error).message, {
        style: { minWidth: 'fit-content' },
      })
    }
  }
  return (
    <Main>
      <Header>
        <Button asChild>
          <Link href="/">
            <HiChevronLeft style={{ width: '1.5rem', height: '1.5rem' }} />
            <LinkText>Back</LinkText>
          </Link>
        </Button>
      </Header>
      <HeaderContent>
        <HeaderInfo>
          <HeaderTitle>Add New Contact</HeaderTitle>
          <HeaderDescription>Enter contact details to add a new entry</HeaderDescription>
        </HeaderInfo>
      </HeaderContent>
      <AddContactForm isLoading={loading} onSubmit={onSubmit} />
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
const Link = styled(NextLink)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${slate.slate11};
  text-decoration: none;
`
const LinkText = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
`
const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`
const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
const HeaderTitle = styled.p`
  font-size: 1.25rem;
  color: ${slate.slate12};
`
const HeaderDescription = styled.p`
  font-size: 0.875rem;
  color: ${slate.slate11};
`
