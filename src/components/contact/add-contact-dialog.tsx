import { AddContactForm } from '@/components/contact/add-contact-form'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { AddContactSchema } from '@/schemas/contact'
import { DialogProps } from '@radix-ui/react-dialog'

export const AddContactDialog = (props: DialogProps) => {
  const onSubmit = (data: AddContactSchema) => {
    console.log(data)
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader
          title="Add New Contact"
          description="Enter contact details to add a new entry"
        />
        <AddContactForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
