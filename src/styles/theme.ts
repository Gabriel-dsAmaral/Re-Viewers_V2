import {
  extendTheme,
  Theme as ChakraTheme,
  ThemeConfig
} from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

export const theme = extendTheme({
  //Dark Mode
  config,

  //Colors sizes and styles of our aplication
  colors: {
    primary: '#E6B578',

    secondary: '#D4A16F',

    brown: '#8A5018',

    grey: {
      light80: '#D1D4EC',
      light: '#C5CBE7',
      grey: '#939393',
      dark: '#4C5166'
    },

    gold: {
      light50: 'rgba(230, 181, 120, 50%)',
      light: 'rgba(230, 181, 120, 1)',
      sand: 'rgba(212, 161, 111, 1)',
      sand20: 'rgba(212, 161, 111, 20%)',
      sand80: 'rgba(212, 161, 111, 80%)'
    }
  }
})
