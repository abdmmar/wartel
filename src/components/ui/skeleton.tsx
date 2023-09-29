import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { jade, slate } from '@radix-ui/colors'

const SkeletonContainer = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>
}

const pulse = keyframes({
  '0%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.5,
  },
  '100%': {
    opacity: 1,
  },
})

const Container = styled.div`
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`
const Skeleton = styled.div<{ h?: string; w?: string; m?: string }>`
  background-color: ${slate.slate7};
  height: ${({ h }) => h || '2rem'};
  width: ${({ w }) => w || '100%'};
  margin: ${({ m }) => m};
`

export const HomeSkeleton = () => {
  return (
    <SkeletonContainer>
      <Main>
        <Header>
          <H1>Wartel</H1>
          <HeaderAction>
            <Skeleton w={'212px'} />
            <Skeleton w={'2rem'} />
          </HeaderAction>
        </Header>
        <Skeleton h="306px" m="0 0 1rem 0" />
        <Skeleton h="306px" />
      </Main>
    </SkeletonContainer>
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
const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const H1 = styled.h1`
  font-size: 1.5rem;
  color: ${jade.jade11};
`
