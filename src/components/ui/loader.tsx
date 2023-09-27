import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { slate } from '@radix-ui/colors'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`
export const Loader = styled.div<{ width?: string; height?: string; color?: string }>`
  width: ${({ width }) => width || '20px'};
  height: ${({ height }) => height || '20px'};
  border: 3px solid ${({ color }) => color || slate.slate1};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${spin} 1s linear infinite;
`
