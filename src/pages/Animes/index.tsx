import {
  Box,
  Container,
  Flex,
  HStack,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Button } from "../../components/Button";
import { useAnime } from "../../Providers/AnimesProvider";

interface AnimeId {
  id: number;
}

export const AnimePage = () => {
  const { getAnimeById, selectedAnime } = useAnime();

  useEffect(() => {
    getAnimeById(53);
    console.log(selectedAnime);
  }, []);
  console.log(selectedAnime);

  return (
    <div>
      {selectedAnime[0] && (
        <>
          <Img
            height="330px"
            width="100vw"
            src="https://tm.ibxk.com.br/2017/11/27/27085616853003.jpg?ims=704x264"
          />

          <div>
            <Text
              marginLeft="270px"
              textAlign={["center", "center", "unset", "unset"]}
              fontWeight="600"
              fontSize="30px"
              color="grey.dark"
            >
              {selectedAnime[0].title}
            </Text>
          </div>
          <HStack marginLeft="270px">
            {selectedAnime[0].category?.map((thisCat) => {
              return (
                <Box
                  border="solid 2px"
                  borderColor="secondary"
                  color="secondary"
                  borderRadius="10px"
                  bgColor="#F6ECE1"
                  width="130px"
                  textAlign="center"
                >
                  {" "}
                  <p>{thisCat}</p>
                </Box>
              );
            })}
            <Flex
              border="solid 2px"
              borderRadius="10px"
              borderColor="secondary"
              bgColor="#F6ECE1"
              color="secondary"
              p="1"
              h="40px"
              marginLeft="40px"
              fontSize="20px"
              fontWeight="600"
              textAlign="center"
              alignItems="center"
            >
              <p> Score: 10</p>
            </Flex>
          </HStack>
          <section>
            <Flex
              marginLeft="20px"
              direction={["row", "row", "column", "column"]}
              top={["70px"]}
              float={["none", "left"]}
              position={["absolute", "fixed", "fixed", "fixed"]}
            >
              <Img
                h={["200px", "200px", "200px", "300px"]}
                w="230px"
                borderRadius="3px"
                src={selectedAnime[0].image_url}
              />
              <VStack>
                <Button w={["30px", "30px", "230px", "230px"]} model="1">
                  Assitindo
                </Button>
                <Button w={["30px", "30px", "230px", "230px"]} model="2">
                  Quero Assistir
                </Button>
                <Button w={["30px", "30px", "230px", "230px"]} model="3">
                  Terminei...
                </Button>
                <Button w={["30px", "30px", "230px", "230px"]} model="4">
                  Avaliar
                </Button>
              </VStack>
            </Flex>
            <article>
              <Text
                textAlign={["center", "center", "unset", "unset"]}
                marginTop="10px"
                marginLeft="270px"
              >
                {selectedAnime[0].synopsis}
              </Text>
            </article>
          </section>
        </>
      )}
    </div>
  );
};
