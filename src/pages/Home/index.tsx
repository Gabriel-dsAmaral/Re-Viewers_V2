import { useBreakpointValue, Box, Flex } from "@chakra-ui/react";
import { SectionContainer } from "../../components/SectionContainer";
import { SliderContainer } from "../../components/SliderContainer";
import { CardLinks } from "../../components/CardLinks";
import { Header } from "../../components/Header";
import { Animes, Animes2, Animes3 } from "../../utils";

export const Home = () => {
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
        <Flex
          flexDirection="column"
          w={isWideVersion ? "70%" : "100%"}
          overflow="hidden"
          minW="50vw"
        >
          <SectionContainer title="5 beast" animeList={Animes} />

          <SectionContainer title="Most Popular" animeList={Animes2} />
        </Flex>

        <CardLinks title="Recomendados" animes={Animes3} />
      </Flex>
    </Box>
  );
};
