import { Flex, Text } from '@chakra-ui/react'
import { Animecard } from '../AnimeCard'

interface Rate {
  userId: number
  value: number
}
interface AnimesData {
  myListStatus?: string
  id: number
  title: string
  category: Array<string>
  rate?: Array<Rate>
  banner_url: string
  image_url: string
  original: string
  status: string
  launch_date: string
  studio: string
  synopsis: string
  userId?: number
  data?: object
}

interface SearchedProps {
  title: string
  animes: AnimesData[]
}

export const Searched = ({ title, animes }: SearchedProps) => {
  return (
    <Flex
      direction="row"
      maxW={['100%', '100%']}
      justifyContent="center"
      flexWrap="wrap"
      alignItems="center"
      backgroundColor="gold.sand20"
      borderRadius="8px"
      border="2px solid #D3A16F"
      paddingY="30px"
    >
      <Text
        textAlign="center"
        color="grey.greyStone"
        fontWeight="700"
        fontSize="28px"
        lineHeight="25px"
      >
        {title}
      </Text>
      <Flex
        w="95%"
        wrap={['nowrap', 'nowrap', 'wrap', 'wrap']}
        gap={['20px', '20px', '20px', '30px']}
        padding={['15px', '15px', '15px', '20px']}
        paddingX={['0', '0']}
        alignItems="center"
        justifyContent={['flex-start', 'flex-start', 'center', 'center']}
        overflow={['hidden', 'hidden', 'overlay', 'overlay']}
        overflowX={['auto', 'auto', 'hidden', 'hidden']}
        maxH="480px"
      >
        {animes.map((anime, index) => (
          <Animecard anime={anime} key={index} />
        ))}
      </Flex>
    </Flex>
  )
}
