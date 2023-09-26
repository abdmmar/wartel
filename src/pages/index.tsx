/** @jsxImportSource @emotion/react */

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { jade, slate } from '@radix-ui/colors'
import { HiPlus } from 'react-icons/hi'

export default function Home() {
  return (
    <Main>
      <Header>
        <H1>Phone</H1>
        <div
          css={css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
          `}
        >
          <Input placeholder="Search contact" />
          <Button size="icon">
            <HiPlus style={{ width: '1rem', height: '1rem', color: jade.jade11 }} />
          </Button>
        </div>
      </Header>
      <div>
        <h2>Favourites</h2>
        <ul>
          <li>Ammar</li>
        </ul>
      </div>
      <div>
        <h2>All Contacts</h2>
        <ul>
          <li>Ammar</li>
        </ul>
      </div>
    </Main>
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
`
const H1 = styled.h1`
  font-size: 1.5rem;
  color: ${jade.jade11};
`
