import { Button } from '@/components/ui/button'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { blackA, slate } from '@radix-ui/colors'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'
import { HiX } from 'react-icons/hi'

const overlayShow = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`

const contentShow = keyframes`
  0% { opacity: 0; transform: translate(-50%, -48%) scale(.96); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close

export const DialogOverlay = styled(DialogPrimitive.Overlay)`
  background-color: ${blackA.blackA9};
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

const DialogContentBox = styled(DialogPrimitive.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 1.2rem;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }
`

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogContentBox ref={ref} className={className} {...props}>
      {children}
    </DialogContentBox>
  </DialogPortal>
))

type DialogHeaderProps = {
  title: string
  description: string
}
export const DialogHeader = ({ title, description }: DialogHeaderProps) => {
  return (
    <DialogHeaderContainer>
      <DialogInfo>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogInfo>
      <DialogClose asChild>
        <Button variant="ghost" size="icon">
          <HiX style={{ width: '20px', height: '20px', color: slate.slate11 }} />
        </Button>
      </DialogClose>
    </DialogHeaderContainer>
  )
}

const DialogHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`
const DialogInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
const DialogTitle = styled(DialogPrimitive.Title)`
  font-size: 1.25rem;
  color: ${slate.slate12};
`
const DialogDescription = styled(DialogPrimitive.Description)`
  font-size: 0.875rem;
  color: ${slate.slate11};
`
