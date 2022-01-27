import { Box, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { BiUserCircle, BiLogOut, BiSearchAlt } from "react-icons/bi";
import { InputSearch } from "../input/InputSearch";

interface AnimeProps {
  id: number;
  title: string;
  categoria: [];
  rate: [];
  banner_url: string;
  image_url: string;
  original: string;
  status: string;
  launch_date: string;
  studio: string;
  synopsis: string;
}

export const Header = () => {
  const [filteredAnimes, setFilteredAnimes] = useState<AnimeProps[]>([]);

  const filterAnimes = (inputValue: string) => {
    setFilteredAnimes(
      [...filteredAnimes].filter((item) => {
        return item.title
          .toLocaleLowerCase()
          .includes(inputValue.toLocaleLowerCase());
      })
    );
  };

  const [showSearchBox, setShowSearchBox] = useState(false);

  const openSearchBox = () => setShowSearchBox(true);

  const closeSearchBox = () => setShowSearchBox(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Flex
      background="#F3DABC"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      height="75px"
      paddingX={["10px", "40px"]}
    >
      {showSearchBox ? (
        <InputSearch
          closeInputSearch={closeSearchBox}
          filterAnimes={() => console.log("oi")}
        />
      ) : (
        <>
          <Box>LOGO</Box>

          <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={["20px", "60px"]}
          >
            {isWideVersion ? (
              <InputSearch
                closeInputSearch={closeSearchBox}
                filterAnimes={() => console.log("oi")}
              />
            ) : (
              <IconButton
                bg="white"
                icon={<BiSearchAlt size={30} />}
                transition="scale .2s linear "
                _hover={{
                  cursor: "pointer",
                  transform: "scale(1.05)",
                }}
                aria-label="supprimer"
                borderRadius="10px"
                onClick={openSearchBox}
              />
            )}

            <IconButton
              bg="white"
              icon={<BiUserCircle size={30} />}
              transition="scale .2s linear "
              _hover={{
                cursor: "pointer",
                transform: "scale(1.05)",
              }}
              aria-label="supprimer"
              borderRadius="10px"
            />

            <IconButton
              bg="white"
              icon={<BiLogOut size={30} />}
              transition="scale .2s linear "
              _hover={{
                cursor: "pointer",
                transform: "scale(1.05)",
              }}
              aria-label="supprimer"
              borderRadius="10px"
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};
