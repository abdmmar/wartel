import errorImg from '@/assets/error.webp'
import { Button } from '@/components/ui/button'
import styled from '@emotion/styled'
import { jade, red, slate } from '@radix-ui/colors'
import Image from 'next/image'
import { FallbackProps } from 'react-error-boundary'

export const ErrorFallback: React.ComponentType<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Container role="alert">
      <EmptyContainer>
        <Image
          priority
          src={errorImg}
          alt="A person with magnifying glass looking to the screen"
          width={200}
          height={200}
        />
        <EmptyTitle>
          Oops! <br /> Something Went Wrong
        </EmptyTitle>
        <EmptyDescription>
          Sorry, but it looks like there's been a hiccup in our web application. Our team is on it!
        </EmptyDescription>
        <EmptyDescription>
          <details>
            <summary>Error details</summary>
            <ErrorDetailContent>{error.message}</ErrorDetailContent>
          </details>
        </EmptyDescription>
        <Button onClick={resetErrorBoundary}>Refresh the page and try again</Button>
      </EmptyContainer>
    </Container>
  )
}
const Container = styled.div`
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
`
const EmptyTitle = styled.h1`
  font-size: 1.5rem;
  color: ${jade.jade11};
  margin-bottom: 0.5rem;
  text-align: center;
`
const EmptyDescription = styled.div`
  font-size: 0.875rem;
  color: ${slate.slate11};
  text-align: center;
  margin-bottom: 1rem;
`
const ErrorDetailContent = styled.pre`
  padding: 1rem;
  border-radius: 4px;
  background-color: ${slate.slate3};
  color: ${red.red11};
`
