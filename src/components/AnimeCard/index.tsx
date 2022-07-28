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
interface AnimeCardProps {
  anime: AnimesData;
}

export const Animecard = ({ anime }: AnimeCardProps) => {
  const [show, setShow] = useState<boolean>(false);

  const navigate = useNavigate();

  const { getAnimeById } = useAnime();

  const handleAnimePage = (animeID: number) => {
    getAnimeById(Number(animeID));
    navigate(`/animePage/${animeID}`);
  };

  return (
    <Box
      backgroundImage={`url(${anime.image_url})`}
      _hover={{ cursor: "pointer" }}
      backgroundPosition="center"
      backgroundSize="cover"
      minW="135px"
      width="135px"
      height="180px"
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
