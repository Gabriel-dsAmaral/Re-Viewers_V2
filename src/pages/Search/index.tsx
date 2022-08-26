import {
  Box,
  Flex,
  useBreakpointValue,
  Spinner,
  CircularProgress,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Searched } from "../../components/CardLinks/Searched";
import { Header } from "../../components/Header";
import { SliderContainer } from "../../components/SliderContainer";
import { useAnime } from "../../Providers/AnimesProvider";

export const Search = () => {
  const { searchList, searched, setLoad, load } = useAnime();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  // let randomAnimes = [];

  // for (let i = 0; i < 10; i++) {
  //   randomAnimes.push(animes[Math.floor(Math.random() * animes.length)]);
  // }

  // randomAnimes.map((atual, index, arr) => {
  //   let anterior = arr[index - 1];
  //   if (anterior !== undefined && anterior.title === atual.title) {
  //     randomAnimes[index] = animes[Math.floor(Math.random() * animes.length)];
  //   }
  // });

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

  return (
    <Box minH="100vh" w="100%">
      <Header />
      <Skeleton isLoaded={load} h={350} fadeDuration={2}>
        {load && <SliderContainer />}
      </Skeleton>
      <Flex
        flexDirection={isWideVersion ? "row" : "column"}
        flexWrap="wrap"
        gap="20px"
        padding={["20px", "20px", "20px", "30px"]}
        justifyContent="space-evenly"
      >
        {load ? (
          <Searched title={searched} animes={searchList} />
        ) : (
          // <Searched title="Relacionados" animes={randomAnimes} />
          <Spinner />
        )}
      </Flex>
    </Box>
  );
};
