import { Box, Text } from '@chakra-ui/react'
import { DarkModeButton } from '../../components/DarkModeButton'

export const Home = () => {
  return (
    <Box>
      <DarkModeButton />
      <Text color="brown" fontWeight="extrabold">
        Testando o Dark Mode
      </Text>
    </Box>
  )
}
