import {
  Grid,
  GridItem,
  Image,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Text,
  SimpleGrid
} from '@chakra-ui/react'
import logo from '../../assets/logo.png'

export const Devs = () => {
  return (
    <SimpleGrid column={2} spacing={2}>
      <GridItem>
        <Image src={logo} />
      </GridItem>

      <List spacing={3}>
        <ListItem>Marcos</ListItem>
        <ListItem>Pleninho</ListItem>
        <ListItem>Hudson</ListItem>
        <ListItem>Dead</ListItem>
        <ListItem></ListItem>
      </List>
    </SimpleGrid>
  )
}
