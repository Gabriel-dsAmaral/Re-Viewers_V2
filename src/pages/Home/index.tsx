import { Box, Flex, useBreakpointValue, VStack, Text } from "@chakra-ui/react";
import { CardLinks } from "../../components/CardLinks";
import { Header } from "../../components/Header";
import { useAnime } from "../../Providers/AnimesProvider";
import { SliderContainer } from "../../components/SliderContainer";
import { SectionContainer } from "../../components/SectionContainer";
import { Footer } from "../../components/Footer";
import { Animes, Animes2, Animes3, categories } from "../../Utils";
import { useEffect } from "react";
import { useUser } from "../../Providers/UserProvider";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const {
    getAllAnimes,
    setSearchList,
    setSearched,
    getBestAnimes,
    bestAnimes,
    animes,
  } = useAnime();

  const { getUserList, user } = useUser();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  useEffect(() => {
    getAllAnimes();
    setSearchList([]);
    setSearched("");
    getBestAnimes(5);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      getUserList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
          {/* <SectionContainer title="5 Melhores" animeList={Animes} /> */}
          <SectionContainer title="5 Melhores" animeList={bestAnimes} />

          <SectionContainer title="Mais Populares" animeList={animes} />
        </Flex>

        {/* <CardLinks title="Recomendados" animes={Animes3} /> */}
      </Flex>
      <Footer />
    </Box>
  );
};
