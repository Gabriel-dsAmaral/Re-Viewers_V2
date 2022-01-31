import { Divider, Flex, Heading } from "@chakra-ui/react";
import { Animecard } from "../AnimeCard";

interface Anime {
  id: number;
  title: string;
  category: Array<string>;
  rate?: Array<string>;
  banner_url: string;
  image_url: string;
  original: string;
  status: string;
  launch_date: string;
  studio: string;
  synopsis: string;
}

interface SectionContainerProps {
  title: string;
  animeList: Anime[];
}

export const SectionContainer = ({
  title,
  animeList,
}: SectionContainerProps) => (
  <>
    <Heading
      as="h3"
      color="grey.greyStone"
      textAlign="center"
      w="100%"
      fontSize="28px"
      paddingY="10px"
    >
      {title}
    </Heading>

    <Divider
      orientation="horizontal"
      bg="secondary"
      marginY="10px"
      height="2px"
      width="50%"
      alignSelf="center"
    />

    <Flex
      justifyContent={["space-between"]}
      alignItems="center"
      overflowY="auto"
      width="100%"
      gap="20px"
    >
      {animeList.map((anime) => (
        <Animecard anime={anime} key={animeList.indexOf(anime)} />
      ))}
    </Flex>
  </>
);
