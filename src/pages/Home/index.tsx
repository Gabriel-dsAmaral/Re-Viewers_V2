import { Box } from "@chakra-ui/react";
import { Header } from "../../components/Header";
// import { DarkModeButton } from '../../components/DarkModeButton'
import { SliderContainer } from "../../components/SliderContainer";

export const Home = () => {
  return (
    <Box minH="100vh" w="100%">
      <Header />
      {/* <DarkModeButton /> */}
      {/* <Text>Testando o Dark Mode</Text> */}
      <SliderContainer />
    </Box>
  );
};
