import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAnime } from "../../Providers/AnimesProvider";
import { useEffect } from "react";

export const SliderContainer = () => {
  const { getAllAnimes, animes } = useAnime();
  // let randomAnimes = [];

  // for (let i = 0; i < 5; i++) {
  //   randomAnimes.push(animes[Math.floor(Math.random() * animes.length)]);
  // }

  const slideImages = [
    // animes[0].banner,
    // randomAnimes[0].banner,
    // randomAnimes[1].banner,
    // randomAnimes[2].banner,
    // randomAnimes[3].banner,
    // randomAnimes[4].banner,
    "https://media.kitsu.io/anime/cover_images/8699/original.jpg",
    "https://media.kitsu.io/anime/cover_images/8063/original.png",
    "https://media.kitsu.io/anime/cover_images/43321/original.png",
    "https://media.kitsu.io/anime/cover_images/8576/original.jpg",
    "https://media.kitsu.io/anime/cover_images/13593/original.jpg",
  ];

  const link = [52, 54, 49, 47, 33];

  const navigate = useNavigate();

  return (
    <Slide easing="ease">
      {slideImages.map((image, index) => (
        <Box
          key={index}
          background={`linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(${image})`}
          _hover={{ cursor: "pointer" }}
          backgroundPosition="center"
          backgroundSize="cover"
          height="350px"
          onClick={() => navigate(`/animePage/${link[index]}`)}
        />
      ))}
    </Slide>
  );
};
