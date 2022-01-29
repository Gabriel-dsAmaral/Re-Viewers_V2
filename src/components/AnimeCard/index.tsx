import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

interface AnimeCardProps {
  image: string;
}

export const Animecard = ({ image }: AnimeCardProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <Box
      backgroundImage={image}
      _hover={{ cursor: "pointer" }}
      backgroundPosition="center"
      backgroundSize="cover"
      max-W="135px"
      minW="135px"
      height="180px"
      borderRadius="2px"
      boxShadow={"-2.5px 5px 7.5px -1px rgba(59,45,31,0.97)"}
      onMouseOver={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Flex
        visibility={show ? "visible" : "hidden"}
        justify="center"
        align="center"
        width="100%"
        height="100%"
        color="white"
        backgroundColor="rgba(0,0,0,0.7)"
      >
        <Text
          display="inline-flex"
          align="center"
          wordBreak="break-word"
          width="80%"
        >
          Nome do Desenho
        </Text>
      </Flex>
    </Box>
  );
};
