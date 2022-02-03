import {
  Box,
  IconButton,
  useBreakpointValue,
  Flex,
  useColorMode,
  useDisclosure,
  Button,
  Img,
} from "@chakra-ui/react";

import {
  BiUserCircle,
  BiLogOut,
  BiSearchAlt,
  BiMoon,
  BiSun,
  BiHome,
  BiUserPlus,
  BiLogIn,
} from "react-icons/bi";

import { InputSearch } from "../Input/InputSearch";
import { Signup } from "../Modals/Signup";
import { SignIn } from "../Modals/SignIn";
import { useState } from "react";
import { useUser } from "../../Providers/UserProvider";
import { useAnime } from "../../Providers/AnimesProvider";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo.png";

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

  const { searched } = useAnime();

  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

  const [showSearchBox, setShowSearchBox] = useState(false);

  const { toggleColorMode } = useColorMode();

  const { accessToken, signOut } = useUser();

  const history = useHistory();

  const toggleSearch = () => {
    if (searched === "" && window.screen.width >= 768) {
      setShowSearchBox(false);
    } else if (searched === "") {
      setShowSearchBox(!showSearchBox);
    } else {
      setShowSearchBox(false);
      searchFunction();
    }
  };

  const searchFunction = () => {
    if (searched !== "") {
      history.push(`/search/${searched}`);
    }
  };

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
    toggleColorMode();
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const goHome = () => {
    history.push("/");
  };

  const goUser = () => {
    history.push("/user");
  };

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
        <InputSearch searchBox={toggleSearch} />
      ) : (
        <>
          <Img src={Logo} alt="Re:viewers" w="50px" h="50px" onClick={goHome} />

          <Flex
            justifyContent="space-between"
            alignItems="center"
            gap={["15px", "100px"]}
          >
            {isWideVersion ? (
              <InputSearch searchBox={toggleSearch} />
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
                onClick={() => toggleSearch()}
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
            <IconButton
              icon={<BiHome size={30} />}
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
              onClick={goHome}
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
                  onClick={goUser}
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
                <IconButton
                  icon={<BiUserPlus size={30} />}
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

                <IconButton
                  icon={<BiLogIn size={30} />}
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
              </>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};
