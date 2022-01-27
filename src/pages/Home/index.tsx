import { Box, Text } from '@chakra-ui/react'
import { DarkModeButton } from '../../components/DarkModeButton'
import { Button } from '../../components/Button'

export const Home = () => {
  return (
    <Box>
      <DarkModeButton />
      <Text color="brown" fontWeight="extrabold">
        Testando o Dark Mode
      </Text>
      <Button model="4" width="150px">
        Teste
      </Button>
    </Box>
  )
}
