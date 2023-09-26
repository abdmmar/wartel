import { Dialog, DialogContent } from '@/components/ui/dialog'
import { DialogProps } from '@radix-ui/react-dialog'

export const AddContactDialog = (props: DialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <h1>Hello World!</h1>
      </DialogContent>
    </Dialog>
  )
}
