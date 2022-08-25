import { Text, useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { Box, Flex, Img, VStack } from "@chakra-ui/react";
import { useAnime } from "../../Providers/AnimesProvider";
import { Button } from "../../components/Button";
import { Comments } from "../../components/Comments";
import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/api";
import { useUser } from "../../Providers/UserProvider";
import { ModalScore } from "../../components/Modals/ModalScore";
import { categories } from "../../Utils";
import { ModalMyListStatus } from "../../components/Modals/ModalStatus";

type Category = {
  category: string;
};

interface AnimesData {
  myListStatus?: string;
  id: string;
  title: string;
  categories: Array<object>;
  average_rate: Number;
  banner: string;
  image: string;
  original_title: string;
  status: string;
  launch_data: string;
  studio: string;
  sinopse: string;
  userId?: number;
  data?: object;
}

type IUserListStatus = {
  id: string;
  watching_status: string;
  anime: AnimesData;
};

export const AnimePage = () => {
  const [scoreResult, setScoreResult] = useState<number>(0);

  const {
    selectedAnime,
    getAnimeById,
    setSearched,
    searchAnime,
    getAllAnimes,
    getAnimesByCategory,
  } = useAnime();

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const { addUserList, watchingList, finishedList, watchLaterList } = useUser();

  const searchCategories = (search: string) => {
    setSearched(search);
    getAnimesByCategory(search);
    navigate(`/search/${search}`);
  };

  useEffect(() => {
    getAnimeById(String(id));
    setSearched("");
    getAllAnimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const {
    isOpen: isOpenModalScore,
    onOpen: OnOpenModalScore,
    onClose: onCloseModalScore,
  } = useDisclosure();

  const {
    isOpen: isOpenModalInfo,
    onOpen: OnOpenModalInfo,
    onClose: onCloseModalInfo,
  } = useDisclosure();

  const statusFound: IUserListStatus[] = [];
  const handleUserList = (list: IUserListStatus[]) => {
    const found = list.find((e) => e.anime["id"] === id);

    if (found) {
      statusFound.push(found);
      console.log("statusFound", statusFound);
      return true;
    }

    return false;
  };

  return (
    <Box width="100%" minH="100vh">
      <Header />

      {selectedAnime.categories && (
        <>
          <ModalScore
            isOpen={isOpenModalScore}
            onClose={onCloseModalScore}
            selectedAnime={selectedAnime}
          />
          <ModalMyListStatus
            isOpen={isOpenModalInfo}
            onClose={onCloseModalInfo}
          />
          <Box
            background={`linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(${selectedAnime.banner})`}
            backgroundSize="cover"
            backgroundPosition="center"
            height="330px"
            width="100%"
          />
          <Flex
            flexDirection="column"
            alignItems={["center", "center", "center", "start"]}
            marginTop={["-150px", "-150px", "-150px", "0px"]}
            marginLeft={["0px", "0px", "0px", "280px"]}
          >
            <VStack
              direction="column"
              top="120px"
              left="20px"
              position={["static", "static", "static", "fixed"]}
            >
              <Img
                h="300px"
                w="230px"
                borderRadius="3px"
                src={selectedAnime.image}
              />

              {isWideVersion && (
                <VStack w="230px">
                  {handleUserList(watchingList) ? (
                    <Button w="inherit" model="1" disabled>
                      Assistindo
                    </Button>
                  ) : (
                    <Button
                      w="inherit"
                      model="1"
                      onClick={() =>
                        addUserList("Assistindo", id!, statusFound)
                      }
                    >
                      Assistindo
                    </Button>
                  )}
                  {handleUserList(watchLaterList) ? (
                    <Button w="inherit" model="2" disabled>
                      Assistir mais tarde
                    </Button>
                  ) : (
                    <Button
                      w="inherit"
                      model="2"
                      onClick={() =>
                        addUserList("Assistir mais tarde", id!, statusFound)
                      }
                    >
                      Assistir mais tarde
                    </Button>
                  )}
                  {handleUserList(finishedList) ? (
                    <Button w="inherit" model="3" disabled>
                      Finalizado
                    </Button>
                  ) : (
                    <Button
                      w="inherit"
                      model="3"
                      onClick={() => addUserList("Terminado", id!, statusFound)}
                    >
                      Finalizado
                    </Button>
                  )}

                  <Button
                    w="inherit"
                    model="4"
                    onClick={() => OnOpenModalScore()}
                  >
                    Avaliar
                  </Button>
                </VStack>
              )}
            </VStack>
            <Text
              fontWeight="600"
              fontSize="30px"
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
                  textShadow="1px 1px #d6883f"
                >
                  Score: {selectedAnime.average_rate}
                </Text>
              </Box>

              <Box
                width="100%"
                display="inline-flex"
                justifyContent="space-around"
                flexWrap="wrap"
                fontWeight="semibold"
                textShadow="0.5px 0.5px grey"
              >
                {selectedAnime.categories.map((e, key) => {
                  const { category } = e as Category;
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
                      boxShadow="base"
                      _hover={{ cursor: "pointer" }}
                      onClick={() => searchCategories(category)}
                    >
                      {category}
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
            >
              Sobre Anime: {selectedAnime.sinopse}
            </Text>
            {/* <VStack
              border="2px solid"
              borderColor="secondary"
              alignItems="center"
              paddingY="20px"
              borderRadius="10px"
              bgColor="gold.light50"
              maxWidth={["100%", "100%", "100%", "280px"]}
              minW="280px"
              alignSelf="end"
              marginX="20px"
              marginTop="20px"
            >
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize="25px"
                color="primary"
                textShadow="0.5px 0.5px black"
              >
                Categorias
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
                {categories.map((categories, key) => (
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
                    onClick={() => searchCategories(categories)}
                  >
                    {categories}
                  </Box>
                ))}
              </Flex>
            </VStack> */}
            <Flex
              w="100%"
              display={["flex", "flex", "flex", "none"]}
              alignSelf="center"
              alignItems="center"
              justifyContent="space-around"
              flexFlow="row wrap"
              marginY="20px"
              paddingX="10px"
              gap="20px"
            >
              <Button
                minW="150px"
                h="40px"
                model="1"
                onClick={() => addUserList("Assistindo", id!, statusFound)}
              >
                Assitindo
              </Button>
              <Button
                minW="150px"
                h="40px"
                model="2"
                onClick={() =>
                  addUserList("Assistir mais tarde", id!, statusFound)
                }
              >
                Quero Assistir
              </Button>
              <Button
                minW="150px"
                h="40px"
                model="3"
                onClick={() => addUserList("Terminado", id!, statusFound)}
              >
                Terminei...):
              </Button>
              <Button
                minW="150px"
                h="40px"
                model="4"
                onClick={() => OnOpenModalScore()}
              >
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
