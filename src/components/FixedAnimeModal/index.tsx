import { Flex, Img, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAnime } from "../../Providers/AnimesProvider";
import { useUser } from "../../Providers/UserProvider";
import { api } from "../../services/api";
import { Button } from "../Button";

interface AnimesData {
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
  userId?: number;
  data?: object;
}

interface Anime {
  thisAnime: AnimesData;
}

export const FixedAnimeCard = ({ thisAnime }: Anime) => {
  const { user, accessToken } = useUser();
  const { selectedAnime, addAnimeList } = useAnime();
  const userId = user.id;
  const animeId = thisAnime.id;

  const patchMyList = async (userId: number, query: string) => {
    const response = await api.patch(
      `mylist/?animeId=${animeId}&userId=${userId}`,
      { userStatus: query },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  const getMyList = async () => {
    const response = await api.get(
      `mylist/?userId=${userId}`,

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response.data);
  };

  useEffect(() => {
    getMyList();
  }, []);

  const handleMyList = (userId: number, query: string) => {
    if (query === "") {
      addAnimeList(thisAnime);
    } else if (query === "Assistindo" || query === "Terminado") {
      patchMyList(userId, query);
    } else {
      const response = api.patch(
        `/animes/${animeId}`,
        { rate: [...(thisAnime.rate || [0]), 6] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = response;
      console.log(data);
    }
  };
  return (
    <>
      <VStack border="2px solid" direction="column" top="100px">
        <Img
          h="300px"
          w="230px"
          borderRadius="3px"
          src={selectedAnime.image_url}
        />

        <VStack w="230px">
          <Button
            w="inherit"
            model="1"
            onClick={() => handleMyList(userId, "Assistindo")}
          >
            Assitindo
          </Button>
          <Button
            w="inherit"
            model="2"
            onClick={() => handleMyList(userId, "")}
          >
            Quero Assistir
          </Button>
          <Button
            w="inherit"
            model="3"
            onClick={() => handleMyList(userId, "Terminado")}
          >
            Terminei...
          </Button>
          <Button
            w="inherit"
            model="4"
            onClick={() => handleMyList(userId, "Avaliar")}
          >
            Avaliar
          </Button>
        </VStack>
      </VStack>
    </>
  );
};
