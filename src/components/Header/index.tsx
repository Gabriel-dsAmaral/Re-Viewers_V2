import {
  IconButton,
  useBreakpointValue,
  Flex,
  useColorMode,
  useDisclosure,
  Img,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
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
  BiMenu,
} from "react-icons/bi";

import { InputSearch } from "../Input/InputSearch";
import { Signup } from "../Modals/Signup";
import { SignIn } from "../Modals/SignIn";
import { useState } from "react";
import { useUser } from "../../Providers/UserProvider";
import { useAnime } from "../../Providers/AnimesProvider";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { ModalConfirm } from "../Modals/ModalConfirm";
import { categories } from "../../Utils";

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

  const {
    isOpen: isModalConfirmOpen,
    onOpen: onModalConfirmOpen,
    onClose: onModalConfirmClose,
  } = useDisclosure();

  const { searched, setSearched, getAnimesByCategory, setLoad, load } =
    useAnime();

  const [isLightTheme, setIsLightTheme] = useState<boolean>(true);

  const [showSearchBox, setShowSearchBox] = useState(false);

  const { toggleColorMode } = useColorMode();

  const { accessToken, signOut } = useUser();

  const navigate = useNavigate();

  const searchCategories = (search: string) => {
    setSearched(search);
    getAnimesByCategory(search);

    setLoad(false);
    navigate(`/search/${search}`);
  };

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
      navigate(`/search/${searched}`);
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
    navigate("/");
  };

  const goUser = () => {
    navigate("/user");
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
          <Img
            src={Logo}
            alt="Re:viewers"
            w="50px"
            h="50px"
            onClick={goHome}
            cursor="pointer"
          />

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
            <ModalConfirm
              isOpen={isModalConfirmOpen}
              onClose={onModalConfirmClose}
              title="ERABE!!!"
              message="Deseja realmente deletar o comentario"
              result="Se confirmar não tem como voltar atras pense bem"
            />

            <Menu>
              {isWideVersion ? (
                <MenuButton
                  as={Button}
                  bg="transparent"
                  w="100%"
                  color="white"
                  fontSize={20}
                >
                  Categorias
                </MenuButton>
              ) : (
                <MenuButton
                  as={IconButton}
                  icon={<BiMenu size={30} />}
                  bg="transparent"
                  w="100%"
                  color="white"
                  fontSize={20}
                />
              )}
              <MenuList h="500px" overflowY="scroll">
                {categories.map((categories, key) => (
                  <MenuItem
                    key={key}
                    onClick={() => searchCategories(categories)}
                  >
                    {categories}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

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
