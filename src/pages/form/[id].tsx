import { EditContactForm } from '@/components/contact/edit-contact-form'
import { Button } from '@/components/ui/button'
import { EditContactSchema } from '@/schemas/contact'
import { useCheckContactName, useEditContact, useGetContact } from '@/services/contact'
import styled from '@emotion/styled'
import { slate } from '@radix-ui/colors'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { HiChevronLeft } from 'react-icons/hi'

export default function CreateContactPage() {
  const router = useRouter()
  const { id } = router.query
  const contactId = Array.isArray(id) ? parseInt(id[0]) : id && parseInt(id)
  const { data, loading } = useGetContact({
    variables: {
      id: contactId as number,
    },
    onCompleted(data) {
      if (!data.contact_by_pk) {
        router.push('/')
      }
    },
    skip: !contactId,
  })
  const { isContactExists, loading: checkingContact } = useCheckContactName()
  const { editContact, loading: editingContact } = useEditContact()

  const onSubmit = async (data: EditContactSchema) => {
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

      const result = await editContact({
        id: contactId as number,
        input: data,
      })

      if (result.data) {
        toast.success('Contact edited successfully!')
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
          <HeaderTitle>Edit Contact</HeaderTitle>
          <HeaderDescription>Update the contact's information below.</HeaderDescription>
        </HeaderInfo>
      </HeaderContent>
      <EditContactForm
        isLoading={loading || checkingContact || editingContact}
        defaultValue={data?.contact_by_pk}
        onSubmit={onSubmit}
      />
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
