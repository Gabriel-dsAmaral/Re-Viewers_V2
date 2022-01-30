import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Box } from "@chakra-ui/react";

export const SliderContainer = () => {
  const slideImages = [
    "https://media.kitsu.io/anime/cover_images/8699/original.jpg",
    "https://media.kitsu.io/anime/cover_images/8063/original.png",
    "https://media.kitsu.io/anime/cover_images/43321/original.png",
    "https://media.kitsu.io/anime/cover_images/8576/original.jpg",
    "https://media.kitsu.io/anime/cover_images/10028/original.jpg",
  ];

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
        />
      ))}
    </Slide>
  );
};
