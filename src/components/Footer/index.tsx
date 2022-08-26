import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <Flex
      direction="row"
      width="100%"
      height="40px"
      bgColor="#7c4f1757"
      alignItems="center"
      justifyContent="space-around"
    >
      <Text _hover={{ cursor: "pointer" }} onClick={() => navigate("/aboutUs")}>
        About Us
      </Text>
      <Text _hover={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        Home
      </Text>
      <Text
        _hover={{ cursor: "pointer" }}
        onClick={() => navigate("/developers")}
      >
        Developers
      </Text>
    </Flex>
  );
};
