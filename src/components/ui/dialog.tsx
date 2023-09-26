import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { blackA, jade } from '@radix-ui/colors'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'

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
  padding: 25px;
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

export const DialogTitle = styled(DialogPrimitive.Title)`
  margin: 0;
  font-weight: 500;
  color: ${jade.jade12};
  font-size: 17px;
`

export const DialogDescription = styled(DialogPrimitive.Description)`
  margin: 10px 0 20px;
  color: ${jade.jade11};
  font-size: 15px;
  line-height: 1.5;
`
