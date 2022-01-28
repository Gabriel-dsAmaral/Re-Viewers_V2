import { Box } from "@chakra-ui/react";

interface AnimeCardProps {
  image: string;
}

export const Animecard = ({ image }: AnimeCardProps) => (
  <Box
    backgroundImage={image}
    _hover={{ cursor: "pointer" }}
    backgroundPosition="center"
    backgroundSize="cover"
    max-W="135px"
    minW="135px"
    height="180px"
  />
);
