import { Box, Flex, Grid, GridItem, Img } from "@chakra-ui/react";
import { Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { useAnime } from "../../Providers/AnimesProvider";
import { Button } from "../../components/Button";
import { Comments } from "../../components/Comments";
import { Header } from "../../components/Header";
import { useEffect } from "react";

export const AnimePage = () => {
  const { selectedAnime, getAnimeById } = useAnime();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const getIdAnimeNumber = () => {
    const pathName = window.location.pathname;
    const output = pathName.slice(-2).replace("/", "");
    return Number(output);
  };

  const animeId = getIdAnimeNumber();

  useEffect(() => {
    getAnimeById(animeId);
  }, []);

  return (
    <Box width="100%" minH="100vh">
      <Header />

      {selectedAnime.category && (
        <>
          <Box
            background={`linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(${selectedAnime.banner_url})`}
            // background={`linear-gradient(rgba(211, 236, 226, 1), rgba(246, 236, 226, 0)),url(${selectedAnime.banner_url})`}
            height="330px"
            width="100%"
          />
          <Flex
            // marginLeft={["0px", "0px", "0px", "270px"]}
            flexDirection="column"
            alignItems="center"
            border="2px solid"
            marginTop="-150px"
          >
            {/* IMAGEM E BOTÕES */}
            <VStack border="2px solid" direction="column" top="100px">
              <Img
                h="300px"
                w="230px"
                borderRadius="3px"
                src={selectedAnime.image_url}
              />

              {/* APAGAR-BOTÕES NO MOBILE */}
              {isWideVersion && (
                <VStack w="230px">
                  <Button w="inherit" model="1">
                    Assitindo
                  </Button>
                  <Button w="inherit" model="2">
                    Quero Assistir
                  </Button>
                  <Button w="inherit" model="3">
                    Terminei...):
                  </Button>
                  <Button w="inherit" model="4">
                    Avaliar
                  </Button>
                </VStack>
              )}
            </VStack>
            <Text
              fontWeight="600"
              fontSize="30px"
              color="grey.dark"
              border="2px solid red"
              marginY="10px"
            >
              {selectedAnime.title}
            </Text>
            <Flex
              flexFlow="row wrap"
              justifyContent="space-around"
              alignItems="center"
              width="80%"
              border="2px solid red"
            >
              <Box
                p="1"
                width="100%"
                display="inline-flex"
                justifyContent="center"
              >
                <Text
                  border="solid 2px"
                  borderRadius="10px"
                  borderColor="secondary"
                  bgColor="#F6ECE1"
                  color="#8A5018"
                  fontSize="20px"
                  fontWeight="bold"
                  textAlign="center"
                  lineHeight="40px"
                  width="120px"
                  mb="10px"
                >
                  Score: 6.89
                </Text>
              </Box>

              <Box
                width="100%"
                display="inline-flex"
                justifyContent="space-around"
                flexWrap="wrap"
                border="2px solid"
              >
                {selectedAnime.category.map((category, key) => {
                  return (
                    <Box
                      key={key}
                      border="solid 2px"
                      borderColor="secondary"
                      color="secondary"
                      borderRadius="10px"
                      bgColor="#F6ECE1"
                      width="120px"
                      textAlign="center"
                      marginTop="10px"
                      paddingY="3px"
                    >
                      <p>{category}</p>
                    </Box>
                  );
                })}
              </Box>
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            <Text
              marginTop="10px"
              textAlign="center"
              fontSize="18px"
              color="#c5cbe7"
            >
              Sobre Anime :
            </Text>
            <Text
              marginTop="10px"
              border="2px solid purple"
              textAlign="justify"
              paddingX="20px"
            >
              {selectedAnime.synopsis}
            </Text>

            {!isWideVersion && (
              <VStack w="230px" alignSelf="center" marginY="20px">
                <Button w="inherit" model="1">
                  Assitindo
                </Button>
                <Button w="inherit" model="2">
                  Quero Assistir
                </Button>
                <Button w="inherit" model="3">
                  Terminei...):
                </Button>
                <Button w="inherit" model="4">
                  Avaliar
                </Button>
              </VStack>
            )}
            <VStack
              border="2px solid"
              borderColor="secondary"
              alignItems="center"
              paddingY="20px"
              borderRadius="10px"
              bgColor="#F6ECE1"
              maxWidth="320px"
              alignSelf="center"
              width="100%"
            >
              <Text textAlign="center" fontStyle="bold" fontSize="25px">
                Relacionados
              </Text>
              <Grid
                w="250px"
                templateColumns="repeat(2, 1fr)"
                padding="10px,10px,10px,10px"
                gap="20px"
                mt="30px"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                  (item, key) => (
                    <GridItem
                      key={key}
                      border="2px solid"
                      borderColor="secondary"
                      bgColor="#F6ECE1"
                      color="#8A5018"
                      textAlign="center"
                      borderRadius="10px"
                      padding="5px"
                      _hover={{ cursor: "pointer" }}
                    >
                      Categoria
                    </GridItem>
                  )
                )}
              </Grid>
            </VStack>
          </Flex>
        </>
      )}

      <Comments />
    </Box>
  );
};
