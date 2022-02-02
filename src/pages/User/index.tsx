import { Header } from "../../components/Header";
import { Box, Center, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { CardLinks } from "../../components/CardLinks";
import { Animes, Animes2, Animes3 } from "../../utils";

export const User = () => {
  return (
    <>
      <Header />

      <Box
        background={`linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(https://wallpapercave.com/wp/wp2475532.jpg)`}
        height="330px"
        width="100%"
      />
      <Flex
        width="100%"
        flexDirection="column"
        alignItems="center"
        marginTop="-170px"
      >
        <Flex
          width="80%"
          flexDirection={["column", "column", "column", "column"]}
          alignItems={["center", "center", "start", "start"]}
          justifyContent="start"
        >
          <Box mt="5px">
            <Center
              borderRadius="7px"
              h="205px"
              w="205px"
              bgGradient="linear(to-l, primary, gold.sand)"
            >
              <Image
                h="200px"
                w="200px"
                borderRadius="3px"
                src="http://pm1.narvii.com/6861/44017694789ca7409a0a9a30a8c0be4a7e2bd9f8r1-800-713v2_00.jpg"
              />
            </Center>
          </Box>
          <Flex>
            <Text
              color="grey.light"
              textShadow="2px 2px brown"
              mr="12px"
              fontWeight="700"
              fontSize="36px"
              margin={"0px 15px 0px 25px"}
            >
              Rodolfo
            </Text>
            {/* <Center
              position={["inherit", "inherit", "absolute", "absolute"]}
              top={["0px", "0px", "70px", "70px"]}
              right={["0px", "0px", "23px", "23px"]}
              margin-top={["4px", "4px", "0px", "0px"]}
              bgColor="#DD4A2E"
              
            > */}
            {/* <Text>Editar perfil</Text> */}
            <IconButton
              position={["inherit", "inherit", "absolute", "absolute"]}
              top={["0px", "0px", "70px", "70px"]}
              right={["0px", "0px", "23px", "23px"]}
              mr="8px"
              aria-label="supprimer"
              size="lg"
              bgColor="#DD4A2E"
              icon={<FaEdit />}
            />
            {/* </Center> */}
          </Flex>
        </Flex>

        <Box w="90%" mt="20px">
          <CardLinks animes={Animes} title="Assistindo" />
        </Box>

        <Box w="90%" mt="20px">
          <CardLinks animes={Animes3} title="Quero Assistir" />
        </Box>
        <Box w="90%" mt="20px">
          <CardLinks animes={Animes2} title="Finalizados" />
        </Box>
      </Flex>
    </>
  );
};
