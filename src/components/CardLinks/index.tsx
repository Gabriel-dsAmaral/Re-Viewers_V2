import { Box, Flex, Text } from "@chakra-ui/react";
import { useAnime } from "../../Providers/AnimesProvider";
import { useHistory } from "react-router-dom";

interface CardLinksProps {
  title: string;
  animes: AnimesData[];
}

interface AnimesData {
  title: string;
  banner_url: string;
  id: number;
  image_url: string;
  launch_data: string;
  original: string;
  synopsis: string;
  rate?: Array<string>;
  category?: Array<string>;
  studio: string;
  status: string;
  data?: object;
  userId?: number;
}
export const CardLinks = ({ title, animes }: CardLinksProps) => {
  const history = useHistory();
  const { getAnimeById } = useAnime();
  const handleAnimePage = (animeID: number) => {
    getAnimeById(animeID);
    history.push("/animePage");
  };

  return (
    <Flex
      flexDirection="column"
      w="400px"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gold.sand20"
      borderRadius="8px"
      border="2px solid #D3A16F"
    >
      <Text
        textAlign="center"
        color="grey.greyStone"
        mt="15px"
        fontWeight="700"
        fontSize="30px"
      >
        {title}
      </Text>
      <Flex
        w="100%"
        wrap={["nowrap", "nowrap", "wrap", "wrap"]}
        gap="40px"
        padding="40px"
        alignItems="center"
        justifyContent="flex-start"
        maxH="480px"
        overflow={["hidden", "hidden", "overlay", "overlay"]}
        overflowX={["auto", "auto", "hidden", "hidden"]}
      >
        {animes.map((item) => (
          <Box
            key={animes.indexOf(item)}
            maxW="135px"
            minW="135px"
            h="180px"
            backgroundImage={item.image_url}
            cursor="pointer"
            backgroundPosition="center"
            backgroundSize="cover"
            onClick={() => handleAnimePage(item.id)}
          />
        ))}
      </Flex>
    </Flex>
  );
};
