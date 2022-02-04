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

export const CardLinksUser = ({ title, animes }: CardLinksProps) => {
  return (
    <Flex
      direction="column"
      maxW="100%"
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
        wrap="nowrap"
        gap={["20px", "20px", "20px", "30px"]}
        padding={["15px", "15px", "15px", "20px"]}
        paddingX={["0", "0"]}
        alignItems="center"
        justifyContent="flex-start"
        overflow="overlay"
        maxH="480px"
      >
        {animes.map((anime) => (
          <Animecard anime={anime} key={animes.indexOf(anime)} />
        ))}
      </Flex>
    </Flex>
  );
};
