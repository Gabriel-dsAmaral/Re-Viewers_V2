import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef
} from '@chakra-ui/react'

import { ForwardRefRenderFunction, ReactNode } from 'react'

interface ButtonProps extends ChakraButtonProps {
  model: string
  children?: ReactNode
}

const ButtonBase: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { model, children, ...rest },
  ref
) => {
  return (
    <ChakraButton
      bgColor={
        model === '1'
          ? 'grey.light80'
          : model === '2'
          ? 'gold.sand'
          : model === '3'
          ? 'grey.dark'
          : 'gold.light50'
      }
      color={
        model === '1'
          ? 'grey.grey'
          : model === '2'
          ? 'white'
          : model === '3'
          ? 'white'
          : 'grey.grey'
      }
      {...rest}
    >
      {children}
    </ChakraButton>
  )
}

export const Button = forwardRef(ButtonBase)
