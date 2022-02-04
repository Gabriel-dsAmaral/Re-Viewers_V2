import { Flex } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export const Footer = () => {
  const history = useHistory();
  return (
    <Flex
      direction="row"
      width="100%"
      height="40px"
      bgColor="#7c4f1757"
      alignItems="center"
      justifyContent="space-around"
    >
      <div onClick={() => history.push("/aboutUs")}>About Us</div>
      <div onClick={() => history.push("/")}>Home</div>
      <div>Developers</div>
    </Flex>
  );
};
