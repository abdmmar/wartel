import { Toaster } from 'react-hot-toast'

export const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  )
}
