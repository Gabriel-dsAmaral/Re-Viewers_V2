import { Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { Box, Flex, Img } from "@chakra-ui/react";
import { useAnime } from "../../Providers/AnimesProvider";
import { Button } from "../../components/Button";
import { Comments } from "../../components/Comments";
import { Header } from "../../components/Header";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { useUser } from "../../Providers/UserProvider";

export const AnimePage = () => {
  const { id } = useParams<{ id: string }>();

  const { selectedAnime, getAnimeById } = useAnime();

  const { user, accessToken } = useUser();

  const tokenBearer = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const addToMyList = async (query: string) => {
    let animeData = {
      animeId: selectedAnime.id,
      title: selectedAnime.title,
      category: selectedAnime.category,
      banner_url: selectedAnime.category,
      image_url: selectedAnime.image_url,
      launch_date: selectedAnime.launch_date,
      original: selectedAnime.original,
      rate: selectedAnime.rate,
      status: selectedAnime.status,
      studio: selectedAnime.status,
      synopsis: selectedAnime.synopsis,
      userId: user.id,
      myListStatus: query,
    };

    const response = await api.post("mylist", animeData, tokenBearer);
    console.log("add", response.data);
  };

  const patchMyList = async (AnimeId: Number, query: string) => {
    const response = await api.patch(
      `mylist/${AnimeId}`,
      { myListStatus: query },
      tokenBearer
    );
    console.log("patch", response.data);
  };

  const handlePatchMyList = async (query: string) => {
    const response = await api.get(`/users/${user.id}/myList`, tokenBearer);
    const data = response.data;

    if (
      !data.some(
        (item: { animeId: Number }) => item.animeId === selectedAnime.id
      )
    ) {
      addToMyList(query);
      console.log("adicionei");
    } else {
      let IsInMyList = data.filter(
        (item: { animeId: Number }) => item.animeId === selectedAnime.id
      );
      let IdInFiltered = IsInMyList[0].id;
      patchMyList(IdInFiltered, query);
      console.log("atualizei");
    }
  };

  useEffect(() => {
    getAnimeById(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
            alignItems={["center", "center", "center", "start"]}
            // border="2px solid"
            marginTop={["-150px", "-150px", "-150px", "0px"]}
            marginLeft={["0px", "0px", "0px", "280px"]}
          >
            {/* IMAGEM E BOTÕES */}
            <VStack
              // border="2px solid"
              direction="column"
              top="120px"
              left="20px"
              position={["static", "static", "static", "fixed"]}
            >
              <Img
                h="300px"
                w="230px"
                borderRadius="3px"
                src={selectedAnime.image_url}
              />

              {/* APAGAR-BOTÕES NO MOBILE */}
              {isWideVersion && (
                <VStack w="230px">
                  <Button
                    w="inherit"
                    model="1"
                    onClick={() => handlePatchMyList("Assistindo")}
                  >
                    Assitindo
                  </Button>
                  <Button
                    w="inherit"
                    model="2"
                    onClick={() => handlePatchMyList("Quero assitir")}
                  >
                    Quero Assistir
                  </Button>
                  <Button
                    w="inherit"
                    model="3"
                    onClick={() => handlePatchMyList("Terminei")}
                  >
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
              // border="2px solid red"
              marginY="10px"
              textAlign="center"
            >
              {selectedAnime.title}
            </Text>
            <Flex
              flexFlow={["row wrap", "row wrap", "row wrap", "row-reverse"]}
              justifyContent="space-around"
              alignItems="baseline"
              width={["80%", "80%", "80%", "auto"]}
              // border="2px solid red"
            >
              <Box
                p="1"
                width={["100%", "100%", "100%", "180px"]}
                display="inline-flex"
                justifyContent="center"
                alignItems="end"
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
                // border="2px solid"
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
          <Flex flexDirection={["column", "column", "column", "row"]}>
            <Text
              marginTop="10px"
              textAlign="justify"
              paddingX="20px"
              marginLeft={["0px", "0px", "0px", "260px"]}
              // marginRight={["0px", "0px", "0px", "320px"]}
              // border="2px solid purple"
            >
              Sobre Anime: {selectedAnime.synopsis}
            </Text>

            <VStack
              border="2px solid"
              borderColor="secondary"
              alignItems="center"
              paddingY="20px"
              borderRadius="10px"
              bgColor="#F6ECE1"
              maxWidth={["100%", "100%", "100%", "280px"]}
              minW="280px"
              alignSelf="end"
              marginX="20px"
              marginTop="20px"
              // transform={["0px", "0px", "0px", "translateY(-220px)"]}
            >
              <Text
                textAlign="center"
                fontStyle="bold"
                fontSize="25px"
                color="#8A5018"
              >
                Relacionados
              </Text>
              <Flex
                flexFlow="row wrap"
                justifyContent={[
                  "center",
                  "space-around",
                  "space-around",
                  "center",
                ]}
                alignItems={["center", "center", "center", "center"]}
                gap="20px"
                mt="30px"
                paddingInline="10px"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, key) => (
                  <Box
                    key={key}
                    border="2px solid"
                    borderColor="secondary"
                    bgColor="#F6ECE1"
                    color="#8A5018"
                    textAlign="center"
                    borderRadius="10px"
                    padding="5px"
                    _hover={{ cursor: "pointer" }}
                    minW="100px"
                  >
                    Categoria
                  </Box>
                ))}
              </Flex>
            </VStack>
            <Flex
              w="100%"
              display={["flex", "flex", "flex", "none"]}
              alignSelf="center"
              alignItems="center"
              justifyContent="space-around"
              flexFlow="row wrap"
              // border="2px solid"
              marginY="20px"
              paddingX="10px"
              gap="20px"
            >
              <Button minW="150px" h="40px" model="1">
                Assitindo
              </Button>
              <Button minW="150px" h="40px" model="2">
                Quero Assistir
              </Button>
              <Button minW="150px" h="40px" model="3">
                Terminei...):
              </Button>
              <Button minW="150px" h="40px" model="4">
                Avaliar
              </Button>
            </Flex>
          </Flex>
        </>
      )}
      <Comments />
    </Box>
  );
};
