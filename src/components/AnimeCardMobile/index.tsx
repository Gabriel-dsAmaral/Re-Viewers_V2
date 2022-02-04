import { Button, Center, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAnime } from "../../Providers/AnimesProvider";

export const AnimeCardMobile = () => {
  const { getAnimes, animes } = useAnime();

  useEffect(() => {
    getAnimes();
  });

  const termineiAnmesList = animes.filter(
    (anime) => anime.myListStatus === "Terminei"
  );

  return (
    <Center marginTop="50%" zIndex="999" flexDir="column" position="absolute">
      <Image width="200px" src={termineiAnmesList[1].image_url} />

      <Text fontSize="2.125rem" fontWeight="bold">
        {termineiAnmesList[1].title}
      </Text>
      <Text
        color="grey"
        padding="5px 8px"
        border="1px"
        borderColor="primary"
        borderStyle="solid"
        borderRadius="10px"
        fontSize="1,5rem"
        fontWeight="bold"
        _hover={{ backgroundColor: "gold.light" }}
      >
        Score: <Text>{termineiAnmesList[1].rate}</Text>
      </Text>
      <Flex justifyContent="center" wrap="wrap">
        {termineiAnmesList[1].category.map((textCateg) => (
          <Button
            color="grey"
            bgColor="rgba(212, 161, 111, 0.1)"
            fontSize="0.75rem"
            fontWeight="bold"
            margin="0.5rem"
            border="1px"
            borderColor="primary"
            borderStyle="solid"
            textShadow="outline"
            borderRadius="10px"
            _hover={{ backgroundColor: "gold.light" }}
          >
            {textCateg}
          </Button>
        ))}
      </Flex>
    </Center>
  );
};
