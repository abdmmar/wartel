import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { blackA, slate } from '@radix-ui/colors'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import * as React from 'react'

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogCancel = AlertDialogPrimitive.Cancel
export const AlertDialogAction = AlertDialogPrimitive.Action
export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogOverlay />
    <AlertDialogBox ref={ref} className={className} {...props} />
  </AlertDialogPrimitive.Portal>
))

const overlayShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

const AlertDialogOverlay = styled(AlertDialogPrimitive.Overlay)`
  background-color: ${blackA.blackA9};
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

const AlertDialogBox = styled(AlertDialogPrimitive.Content)`
  background-color: ${slate.slate1};
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  :focus {
    outline: none;
  }
`

export const AlertDialogTitle = styled(AlertDialogPrimitive.Title)`
  margin: 0;
  color: ${slate.slate12};
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`

export const AlertDialogDescription = styled(AlertDialogPrimitive.Description)`
  margin-bottom: 20px;
  color: ${slate.slate11};
  font-size: 14px;
  line-height: 1.5;
`
export const AlertDialogFooter = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 0.5rem;
`
