import { useBreakpointValue, Box, Flex } from "@chakra-ui/react";
import { SectionContainer } from "../../components/SectionContainer";
import { SliderContainer } from "../../components/SliderContainer";
import { Header } from "../../components/Header";
import { Animes } from "../../utils";

export const HomeTeste = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Box minH="100vh" w="100%" backgroundColor="grey.80">
      <Header />

      <SliderContainer />

      <Flex
        flexDirection={isWideVersion ? "row" : "column"}
        gap="20px"
        padding={["20px", "20px", "20px", "30px"]}
      >
        <Flex flexDirection="column" w="100%" overflow="hidden">
          <SectionContainer title="7 most voted" animeList={Animes} />

          <SectionContainer title="Most Popular" animeList={Animes} />

          <SectionContainer title="Similar" animeList={Animes} />
        </Flex>
      </Flex>
    </Box>
  );
};
