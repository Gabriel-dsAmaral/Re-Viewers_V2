import {
  Box,
  IconButton,
  useBreakpointValue,
  Flex,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { InputSearch } from "../Input/InputSearch";
import { useState } from "react";
import {
  BiUserCircle,
  BiLogOut,
  BiSearchAlt,
  BiMoon,
  BiSun,
} from "react-icons/bi";

import { Signup } from "../Modals/Signup";
import { SignIn } from "../Modals/SignIn";

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

  const {
    isOpen: isModalSignupOpen,
    onOpen: onModalSignupOpen,
    onClose: onModalSignupClose,
  } = useDisclosure();

  const {
    isOpen: isModalSignInOpen,
    onOpen: onModalSignInOpen,
    onClose: onModalSignInClose,
  } = useDisclosure();

  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

  const [showSearchBox, setShowSearchBox] = useState(false);

  const openSearchBox = () => setShowSearchBox(true);

  const closeSearchBox = () => setShowSearchBox(false);

  const { colorMode, toggleColorMode } = useColorMode();

  const filterAnimes = (inputValue: string) => {
    setFilteredAnimes(
      [...filteredAnimes].filter((item) => {
        return item.title
          .toLocaleLowerCase()
          .includes(inputValue.toLocaleLowerCase());
      })
    );
  };

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
    toggleColorMode();
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Flex
      // backgroundColor={"gold.light50"}
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      height="60px"
      paddingX={["10px", "40px"]}
      position="absolute"
      top="0"
      zIndex="1"
    >
      {showSearchBox ? (
        <InputSearch
          closeInputSearch={closeSearchBox}
          filterAnimes={() => console.log("oi")}
        />
      ) : (
        <>
          <Box>RE:VIEWERS</Box>

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

            <Signup isOpen={isModalSignupOpen} onClose={onModalSignupClose} />
            <SignIn isOpen={isModalSignInOpen} onClose={onModalSignInClose} />

            <IconButton
              icon={isLightTheme ? <BiMoon size={30} /> : <BiSun size={30} />}
              mixBlendMode="difference"
              bg="transparent"
              color="white"
              transition="scale .2s linear "
              _hover={{
                cursor: "pointer",
                transform: "scale(1.05)",
              }}
              aria-label="supprimer"
              borderRadius="10px"
              onClick={toggleTheme}
            />

            <IconButton
              icon={<BiUserCircle size={30} />}
              mixBlendMode="difference"
              bg="transparent"
              color="white"
              transition="scale .2s linear "
              _hover={{
                cursor: "pointer",
                transform: "scale(1.05)",
              }}
              aria-label="supprimer"
              borderRadius="10px"
              onClick={onModalSignInOpen}
            />

            <IconButton
              icon={<BiLogOut size={30} />}
              mixBlendMode="difference"
              bg="transparent"
              color="white"
              transition="scale .2s linear "
              _hover={{
                cursor: "pointer",
                transform: "scale(1.05)",
              }}
              aria-label="supprimer"
              borderRadius="10px"
              onClick={onModalSignupOpen}
            />
          </Flex>
        </>
      )}
    </Flex>
  );
};
