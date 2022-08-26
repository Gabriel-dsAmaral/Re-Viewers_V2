import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAnime } from "../../Providers/AnimesProvider";

interface AnimesData {
  myListStatus?: string;
  id: string;
  title: string;
  categories: Array<object>;
  average_rate: Number;
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

export const SliderContainer = () => {
  const { animes } = useAnime();

  let randomAnimes: AnimesData[] = [];

  for (let i = 0; i < 5; i++) {
    randomAnimes.push(animes[Math.floor(Math.random() * animes.length)]);
  }

  const navigate = useNavigate();

  return (
    <Slide easing="ease">
      {randomAnimes.length &&
        randomAnimes.map((anime, index) => (
          <Box
            key={index}
            background={`linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(${anime.banner})`}
            _hover={{ cursor: "pointer" }}
            backgroundPosition="center"
            backgroundSize="cover"
            height="350px"
            onClick={() => navigate(`/animePage/${anime.id}`)}
            title={anime.title}
          />
        ))}
    </Slide>
  );
};
