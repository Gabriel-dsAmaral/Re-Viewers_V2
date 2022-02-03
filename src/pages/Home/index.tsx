import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react'
import { CardLinks } from '../../components/CardLinks'
import { Header } from '../../components/Header'
import { useUser } from '../../Providers/UserProvider'
import { useAnime } from '../../Providers/AnimesProvider'
import { useComment } from '../../Providers/CommentsProvider'
import { useEffect } from 'react'
import { SliderContainer } from '../../components/SliderContainer'
import { SectionContainer } from '../../components/SectionContainer'
import { Animes2, Animes3 } from '../../utils'

export const Home = () => {
  const { signOut } = useUser()
  const { animes, getAnimes, setSearchList, setSearched } = useAnime()
  const { MakeComment } = useComment()

  useEffect(() => {
    getAnimes()
    setSearchList([])
    setSearched('')
  }, [])

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true
  })

  return (
    <Box minH="100vh" w="100%" backgroundColor="grey.80">
      <Header />

      <SliderContainer />

      <Flex
        flexDirection={isWideVersion ? 'row' : 'column'}
        gap="20px"
        padding={['20px', '20px', '20px', '30px']}
      >
        <Flex
          flexDirection="column"
          w={isWideVersion ? '70%' : '100%'}
          overflow="hidden"
          minW="50vw"
        >
          <SectionContainer title="5 Melhores" animeList={Animes2} />

          <SectionContainer title="Mais Populares" animeList={Animes2} />
        </Flex>

        <CardLinks title="Recomendados" animes={Animes3} />
      </Flex>
    </Box>
  )
}
