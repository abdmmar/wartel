/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { jade, slate } from '@radix-ui/colors'
import * as React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const inputStyles = css`
  flex: 1;
  height: 2.25rem;
  width: 100%;
  border: 1px solid ${slate.slate6};
  background: transparent;
  padding: 0.75rem;
  font-size: 0.875rem;
  transition: border-color 0.15s ease-in-out;
  border-radius: 0.175rem;
  color: ${slate.slate12};
  outline: none;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  &::placeholder {
    color: ${slate.slate9};
  }
  &:hover {
    border-color: ${jade.jade11};
  }
  &:focus {
    border-color: ${jade.jade11};
    box-shadow: 0 0 0 0.125rem ${jade.jade3};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={className}
        css={css`
          ${inputStyles};
        `}
        ref={ref}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
