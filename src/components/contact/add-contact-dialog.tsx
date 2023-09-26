import { AddContactForm } from '@/components/contact/add-contact-form'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { AddContactSchema } from '@/schemas/contact'
import { useCreateContact } from '@/services/contact'
import { DialogProps } from '@radix-ui/react-dialog'
import toast from 'react-hot-toast'

export const AddContactDialog = (props: DialogProps) => {
  const { createContact, loading } = useCreateContact()

  const onSubmit = async (data: AddContactSchema) => {
    try {
      const result = await createContact(data)

      if (result.data) {
        toast.success('Contact added successfully!')
        props?.onOpenChange?.(false)
      }
    } catch (error) {
      toast.error((error as Error).message, {
        style: { minWidth: 'fit-content' },
      })
    }
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader
          title="Add New Contact"
          description="Enter contact details to add a new entry"
        />
        <AddContactForm isLoading={loading} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
