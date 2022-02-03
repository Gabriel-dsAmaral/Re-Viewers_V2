import { Center, Image, Text } from "@chakra-ui/react";
import Like from "../../assets/chika.gif";

export const CallingCard = () => (
  <Center
    maxWidth="385px"
    borderRadius="8px"
    bgColor="gold.light50"
    flexDir="column"
    border="2px solid"
    margin="10px 0 10px 10px"
  >
    <Text
      as="h2"
      textAlign="center"
      fontWeight="extrabold"
      fontStyle="italic"
      fontSize="1.3rem"
      color="grey.dark"
    >
      Registre-se, faça login e junte-se a nossa comunidade!
    </Text>
    <Image w="250px" border="2px solid" borderColor="grey.dark" src={Like} />
    <Text color="grey.dark" fontWeight="bold" fontStyle="italic" fontSize="m">
      Confia na call!
    </Text>
  </Center>
);
