import {
  Box,
  Flex,
  useBreakpointValue,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { useAnime } from "../../Providers/AnimesProvider";
import { SliderContainer } from "../../components/SliderContainer";
import { SectionContainer } from "../../components/SectionContainer";
import { Footer } from "../../components/Footer";
import { useEffect } from "react";
import { useUser } from "../../Providers/UserProvider";

export const Home = () => {
  const {
    getAllAnimes,
    setSearchList,
    setSearched,
    getBestAnimes,
    bestAnimes,
    animes,
    setLoad,
    load,
  } = useAnime();

  const { getUserList, user } = useUser();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  useEffect(() => {
    if (!!!animes.length) {
      getAllAnimes();
    }

    setSearchList([]);
    setSearched("");
    getBestAnimes(5);

    const timer = setTimeout(() => setLoad(true), 1500);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("slider", load);

  useEffect(() => {
    if (user) {
      getUserList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box minH="100vh" w="100%" backgroundColor="grey.80">
      <>
        <Header />
        <Skeleton isLoaded={load} h={350} fadeDuration={2}>
          {load && <SliderContainer />}
        </Skeleton>

        {/* <Flex
        flexDirection={isWideVersion ? "row" : "column"}
        gap="20px"
        padding={["20px", "20px", "20px", "30px"]}
      > */}
        <Flex
          flexDirection="column"
          w={isWideVersion ? "90%" : "100%"}
          overflow="hidden"
          minW="50vw"
          m="0 auto"
        >
          {/* <SectionContainer title="5 Melhores" animeList={Animes} /> */}
          <SectionContainer title="5 Melhores" animeList={bestAnimes} />

          <SectionContainer title="Catálogo" animeList={animes} />
        </Flex>

        {/* <CardLinks title="Recomendados" animes={Animes3} /> */}
        {/* </Flex> */}
        <Footer />
      </>
    </Box>
  );
};
