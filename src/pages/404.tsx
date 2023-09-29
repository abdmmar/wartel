import notFound from '@/assets/not-found.webp'
import { Button } from '@/components/ui/button'
import styled from '@emotion/styled'
import { jade, slate } from '@radix-ui/colors'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <Container>
      <EmptyContainer>
        <Image priority src={notFound} alt="A person looking a map" width={200} height={200} />
        <EmptyTitle>Oops! Page Not Found</EmptyTitle>
        <EmptyDescription>
          We couldn't find the page you're looking for in your phone book. It seems like you've
          ventured into uncharted territory.
        </EmptyDescription>
        <Button asChild>
          <Link href="/">Return to your contact list.</Link>
        </Button>
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
`
const EmptyDescription = styled.div`
  font-size: 0.875rem;
  color: ${slate.slate11};
  text-align: center;
  margin-bottom: 1rem;
`
