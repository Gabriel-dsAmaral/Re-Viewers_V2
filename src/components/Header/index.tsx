import {
  Box,
  IconButton,
  useBreakpointValue,
  Flex,
  useColorMode,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

import {
  BiUserCircle,
  BiLogOut,
  BiSearchAlt,
  BiMoon,
  BiSun,
} from "react-icons/bi";

import { InputSearch } from "../Input/InputSearch";
import { Signup } from "../Modals/Signup";
import { SignIn } from "../Modals/SignIn";
import { useState } from "react";
import { useUser } from "../../Providers/UserProvider";

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

  const { toggleColorMode } = useColorMode();

  const { accessToken, signOut } = useUser();

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
                icon={<BiSearchAlt size={30} />}
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
                onClick={openSearchBox}
              />
            )}

            <SignIn isOpen={isModalSignInOpen} onClose={onModalSignInClose} />
            <Signup isOpen={isModalSignupOpen} onClose={onModalSignupClose} />

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

            {!!accessToken ? (
              <>
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
                  onClick={signOut}
                />
              </>
            ) : (
              <>
                <Button
                  mixBlendMode="difference"
                  bg="transparent"
                  color="white"
                  _hover={{
                    background: "gray",
                  }}
                  onClick={onModalSignupOpen}
                >
                  Sign Up
                </Button>
                <Button
                  mixBlendMode="difference"
                  bg="transparent"
                  color="white"
                  _hover={{
                    background: "gray",
                  }}
                  onClick={onModalSignInOpen}
                >
                  Sign In
                </Button>
              </>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};
