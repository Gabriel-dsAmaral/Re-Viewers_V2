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
      background={
        model === '1'
          ? 'grey.light80'
          : model === '2'
          ? 'gold.sand'
          : model === '3'
          ? 'grey.dark'
          : 'gold.light50'
      }
      border="2px"
      borderStyle="solid"
      borderColor={
        model === '1'
          ? 'grey.light80'
          : model === '2' || model === '3'
          ? 'none'
          : 'gold.light50'
      }
      _hover={{
        background:
          model === '1'
            ? 'grey.light80'
            : model === '2'
            ? 'gold.sand'
            : model === '3'
            ? 'grey.dark'
            : 'gold.light50',
        borderColor: model === '3' ? 'primary' : 'black'
      }}
      textColor={
        model === '1'
          ? 'grey.dark'
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
