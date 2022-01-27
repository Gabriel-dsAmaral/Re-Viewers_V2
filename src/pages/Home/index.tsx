import { Box } from "@chakra-ui/react";
import { Header } from "../../components/header";
// import { DarkModeButton } from '../../components/DarkModeButton'

export const Home = () => {
  return (
    <Box minH="100vh" w="100%">
      <Header />
      {/* <DarkModeButton /> */}
      {/* <Text>Testando o Dark Mode</Text> */}
    </Box>
  );
};
