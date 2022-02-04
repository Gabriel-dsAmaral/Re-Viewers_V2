import { Center, Image, Text } from "@chakra-ui/react";
import Like from "../../assets/chika.gif";

export const CallingCard = () => (
  <Center
    maxWidth="385px"
    borderRadius="8px"
    bgColor="#F2DABB"
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
      color="#515A6E"
    >
      Registre-se, faça login e junte-se a nossa comunidade!
    </Text>
    <Image w="250px" border="2px solid" borderColor="#515A6E" src={Like} />
    <Text color="#515A6E" fontWeight="bold" fontStyle="italic" fontSize="m">
      Confia na call!
    </Text>
  </Center>
);
