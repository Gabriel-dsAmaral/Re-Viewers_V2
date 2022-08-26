import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnime } from "../../Providers/AnimesProvider";

interface Rate {
  userId: number;
  value: number;
}
interface AnimesData {
  myListStatus?: string;
  id: string;
  title: string;
  categories: Array<object>;
  rate?: Array<Rate>;
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
interface AnimeCardProps {
  anime: AnimesData;
}

export const Animecard = ({ anime }: AnimeCardProps) => {
  const [show, setShow] = useState<boolean>(false);

  const navigate = useNavigate();

  const { getAnimeById } = useAnime();

  const handleAnimePage = (animeID: string) => {
    getAnimeById(animeID);
    navigate(`/animePage/${animeID}`);
  };

  return (
    <Box
      backgroundImage={`url(${anime.image})`}
      _hover={{ cursor: "pointer" }}
      backgroundPosition="center"
      backgroundSize="cover"
      minW="135px"
      width="160px"
      height="205px"
      borderRadius="2px"
      boxShadow={"-2.5px 5px 7.5px -1px rgba(59,45,31,0.97)"}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      textAlign="center"
    >
      <Flex
        visibility={show ? "visible" : "hidden"}
        justify="center"
        align="center"
        width="100%"
        height="100%"
        color="white"
        backgroundColor="rgba(0,0,0,0.7)"
        onClick={() => handleAnimePage(anime.id)}
      >
        <Text wordBreak="break-word">{anime.title}</Text>
      </Flex>
    </Box>
  );
};
