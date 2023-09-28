/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { jade, red, slate } from '@radix-ui/colors'
import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

const buttonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  border: none;
  border: 1px solid ${slate.slate6};
  background: ${slate.slate1};
  color: ${slate.slate12};
  cursor: pointer;
  transition:
    background,
    border-color 0.15s ease-in-out;

  :focus-visible {
    outline: none;
    border-color: ${jade.jade11};
    box-shadow: 0 0 0 0.125rem ${jade.jade3};
  }

  &:focus {
    border-color: ${jade.jade11};
    box-shadow: 0 0 0 0.125rem ${jade.jade3};
  }

  :disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &:hover {
    background: ${jade.jade2};
  }

  &.primary {
    background-color: ${jade.jade11};
    color: ${slate.slate1};
  }

  &.ghost {
    border: none;

    :focus-visible {
      border: 1px solid;
      outline: none;
      border-color: ${jade.jade11};
      box-shadow: 0 0 0 0.125rem ${jade.jade3};
    }

    &:focus {
      box-shadow: none;
    }
  }

  &.destructive {
    background-color: ${red.red11};
    color: ${slate.slate1};

    :focus-visible {
      border: 1px solid;
      outline: none;
      border-color: ${red.red12};
      box-shadow: 0 0 0 0.125rem ${red.red3};
    }

    &:focus {
      box-shadow: none;
    }
  }

  &.sm {
    height: 2rem;
    font-size: 0.75rem;
    padding-block: 0.75rem;
  }

  &.default {
    height: 2.25rem;
    padding-block: 1rem;
    padding-inline: 0.5rem;
  }

  &.lg {
    height: 2.5rem;
    padding-block: 2rem;
  }

  &.icon {
    width: 2.25rem;
    height: 2.25rem;
  }
`

const styleVariant = {
  ghost: 'ghost',
  primary: 'primary',
  destructive: 'destructive',
}

const sizeVariant = {
  sm: 'sm',
  lg: 'lg',
  icon: 'icon',
  default: 'default',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof sizeVariant
  variant?: keyof typeof styleVariant
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size = 'default', asChild, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        css={buttonStyles}
        className={`${className || ''} ${size ? sizeVariant[size] : ''} ${
          variant ? styleVariant[variant] : ''
        }`}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = 'Button'

export { Button }
