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
import { useAnime } from "../../Providers/AnimesProvider";
import { useHistory } from "react-router-dom";

export const Header = () => {
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

  const { searchList, setSearchList, setSearched, searched } = useAnime();

  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

  const [showSearchBox, setShowSearchBox] = useState(false);

  const history = useHistory();

  const searchBox = () => {
    console.log(searchList);
    if (searchList[0]) {
      setShowSearchBox(!showSearchBox);
      history.push(`/search/${searched}`);
      setSearchList([]);
      setSearched("");
    } else {
      setShowSearchBox(!showSearchBox);
    }
  };

  const { toggleColorMode } = useColorMode();

  const { accessToken, signOut } = useUser();

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
        <InputSearch searchBox={searchBox} />
      ) : (
        <>
          <Box>LOGO</Box>

          <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={["20px", "60px"]}
          >
            {isWideVersion ? (
              <InputSearch searchBox={searchBox} />
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
                onClick={() => searchBox()}
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
                  width="15px"
                  mixBlendMode="difference"
                  bg="transparent"
                  color="white"
                  _hover={{
                    background: "gray",
                  }}
                  onClick={onModalSignupOpen}
                >
                  SUp
                </Button>
                <Button
                  width="15px"
                  mixBlendMode="difference"
                  bg="transparent"
                  color="white"
                  _hover={{
                    background: "gray",
                  }}
                  onClick={onModalSignInOpen}
                >
                  SIn
                </Button>
              </>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};
