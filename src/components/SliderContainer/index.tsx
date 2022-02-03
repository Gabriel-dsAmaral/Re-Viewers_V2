import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import { Box } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

export const SliderContainer = () => {
  const slideImages = [
    'https://media.kitsu.io/anime/cover_images/8699/original.jpg',
    'https://media.kitsu.io/anime/cover_images/8063/original.png',
    'https://media.kitsu.io/anime/cover_images/43321/original.png',
    'https://media.kitsu.io/anime/cover_images/8576/original.jpg',
    'https://media.kitsu.io/anime/cover_images/13593/original.jpg'
  ]

  const link = [52, 54, 49, 47, 33]

  const history = useHistory()

  return (
    <Slide easing="ease">
      {slideImages.map((image, index) => (
        <Box
          key={index}
          background={`linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(${image})`}
          // background={`linear-gradient(rgba(246, 236, 226, 1), rgba(246, 236, 226, 0)),url(${image})`}
          _hover={{ cursor: 'pointer' }}
          backgroundPosition="center"
          backgroundSize="cover"
          height="350px"
          onClick={() => history.push(`/animePage/${link[index]}`)}
        />
      ))}
    </Slide>
  )
}
