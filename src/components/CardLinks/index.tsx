import { Box, Flex, Text } from "@chakra-ui/react";
import { useAnime } from "../../Providers/AnimesProvider";
import { useHistory } from "react-router-dom";
import { useComment } from "../../Providers/CommentsProvider";

interface CardLinksProps {
  title: string;
  animes: AnimesData[];
}

interface AnimesData {
  title: string;
  banner_url: string;
  id: number;
  image_url: string;
  launch_date: string;
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
  const { LoadComments, comments } = useComment();
  const handleAnimePage = (animeID: number) => {
    getAnimeById(animeID);
    LoadComments(animeID);
    console.log(comments);
    history.push("/animePage");
  };

  return (
    <Flex
      direction="column"
      maxW={["100%", "100%", "400px", "400px"]}
      justifyContent="center"
      alignItems="center"
      backgroundColor="gold.sand20"
      borderRadius="8px"
      border="2px solid #D3A16F"
      paddingY="30px"
      // boxShadow={" -3px -1px 19px -1px #D3A16F"}
    >
      <Text
        textAlign="center"
        color="grey.greyStone"
        fontWeight="700"
        fontSize="28px"
        lineHeight="25px"
      >
        {title}
      </Text>
      <Flex
        w="100%"
        wrap={["nowrap", "nowrap", "wrap", "wrap"]}
        gap={["20px", "20px", "20px", "30px"]}
        padding={["15px", "15px", "15px", "20px"]}
        paddingX={["0", "0"]}
        alignItems="center"
        justifyContent={["flex-start", "flex-start", "center", "center"]}
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
