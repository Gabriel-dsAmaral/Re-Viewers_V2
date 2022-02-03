import { Flex, Text } from "@chakra-ui/react";
import { Animecard } from "../AnimeCard";

interface Rate {
  userId: number;
  value: number;
}
interface AnimesData {
  myListStatus?: string;
  id: number;
  title: string;
  category: Array<string>;
  rate?: Array<Rate>;
  banner_url: string;
  image_url: string;
  original: string;
  status: string;
  launch_date: string;
  studio: string;
  synopsis: string;
  userId?: number;
  data?: object;
}
interface CardLinksProps {
  title: string;
  animes: AnimesData[];
}

export const CardLinks = ({ title, animes }: CardLinksProps) => {
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
        w="90%"
        wrap={["nowrap", "nowrap", "wrap", "wrap"]}
        gap={["20px", "20px", "20px", "30px"]}
        padding={["15px", "15px", "15px", "20px"]}
        paddingX={["0", "0"]}
        alignItems="center"
        justifyContent={["flex-start", "flex-start", "center", "center"]}
        overflow={["hidden", "hidden", "overlay", "overlay"]}
        overflowX={["auto", "auto", "hidden", "hidden"]}
        maxH="480px"
        css={{
          " ::-webkit-scrollbar": {
            width: "10px",
          },

          " ::-webkit-scrollbar-track-piece": {
            background: "#E1B176",
          },

          " ::-webkit-scrollbar-thumb": {
            background: "#CBCBCB",
            outline: "2px solid #FFF",
            border: "1px solid #B7B7B7",
            borderRadius: "8px",
            mt: "5px",
          },

          " ::-webkit-scrollbar-thumb:hover": {
            background: " #909090",
          },
        }}
      >
        {animes.map((anime) => (
          <Animecard anime={anime} key={animes.indexOf(anime)} />
        ))}
      </Flex>
    </Flex>
  );
};
