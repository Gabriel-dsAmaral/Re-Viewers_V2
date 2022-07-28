import { Flex } from "@chakra-ui/react";
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
      <div onClick={() => navigate("/aboutUs")}>About Us</div>
      <div onClick={() => navigate("/")}>Home</div>
      <div>Developers</div>
    </Flex>
  );
};
