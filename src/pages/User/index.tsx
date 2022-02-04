import {
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { FaEdit } from "react-icons/fa";
import { CardLinksUser } from "../../components/CardLinksUser/index";
import { useUser } from "../../Providers/UserProvider";
import { UserEdits } from "../../components/Modals/UserEdits";
import { api } from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";

interface Rate {
  userId: number;
  value: number;
}
interface AnimesData {
  myListStatus?: string;
  id: number;
  title: string;
  category: Array<string>;
  rate?: Array<Rate>;
  banner_url: string;
  image_url: string;
  original: string;
  status: string;
  launch_date: string;
  studio: string;
  synopsis: string;
  userId?: number;
  data?: object;
  animeId: number;
}

export const User = () => {
  const { user, accessToken } = useUser();

  const [watching, setWatching] = useState<AnimesData[]>([]);
  const [finished, setFinished] = useState<AnimesData[]>([]);
  const [wantWatch, setWantWatch] = useState<AnimesData[]>([]);

  const tokenBearer = { headers: { Authorization: `Bearer ${accessToken}` } };

  const getWatching = async () => {
    const response = await api.get(`/users/${user.id}/myList`, tokenBearer);
    const data = response.data;

    const filteredWatch = data.filter(
      (item: { myListStatus: string }) => item.myListStatus === "Assistindo"
    );

    setWatching(filteredWatch);
  };

  const getFinished = async () => {
    const response = await api.get(`/users/${user.id}/myList`, tokenBearer);
    const data = response.data;

    const filteredFinished = data.filter(
      (item: { myListStatus: string }) => item.myListStatus === "Terminei"
    );

    setFinished(filteredFinished);
  };

  const getWantedToWatch = async () => {
    const response = await api.get(`/users/${user.id}/myList`, tokenBearer);
    const data = response.data;

    const filteredWantToWatch = data.filter(
      (item: { myListStatus: string }) => item.myListStatus === "Quero assitir"
    );

    setWantWatch(filteredWantToWatch);
  };

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  useEffect(() => {
    getWatching();
    getWantedToWatch();
    getFinished();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />

      <Box
        background={`linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(https://wallpapercave.com/wp/wp2475532.jpg)`}
        height="330px"
        width="100%"
      />
      <Flex
        width="100%"
        flexDirection="column"
        alignItems="center"
        marginTop="-170px"
      >
        <Flex
          width="80%"
          flexDirection={["column", "column", "column", "column"]}
          alignItems={["center", "center", "start", "start"]}
          justifyContent="start"
        >
          <Box mt="5px">
            <Center borderRadius="7px" h="205px" w="205px">
              <Image
                border="solid 3px"
                borderColor="gold.sand"
                marginBottom="7px"
                h="200px"
                w="200px"
                borderRadius="3px"
                src={user.userImg}
              />
            </Center>
          </Box>
          <Flex>
            <Text
              color="grey.light"
              textShadow="2px 2px brown"
              mr="12px"
              fontWeight="700"
              height={["40px", "40px", "54px", "54px"]}
              fontSize="36px"
              margin={"0px 15px 0px 25px"}
            >
              {user.name}
            </Text>
            <Center
              _hover={{ cursor: "pointer" }}
              w={["40px", "40px", "152px", "152px"]}
              borderRadius="5px"
              position={["inherit", "inherit", "absolute", "absolute"]}
              top={["0px", "0px", "70px", "70px"]}
              right={["0px", "0px", "23px", "23px"]}
              margin-top={["4px", "4px", "0px", "0px"]}
              bgColor="#DD4A2E"
              onClick={onModalOpen}
            >
              <Text
                display={["none", "none", "block", "block"]}
                marginLeft={["auto", "auto", "7px", "7px"]}
                fontWeight="600"
              >
                Editar perfil
              </Text>
              <IconButton
                _hover={{ bgColor: "#DD4A2E" }}
                _focus={{ border: "none", bgColor: "#DD4A2E" }}
                _active={{ bgColor: "#DD4A2E" }}
                border="none"
                mr="8px"
                aria-label="supprimer"
                size="lg"
                bgColor="#DD4A2E"
                icon={<FaEdit />}
              />
            </Center>
          </Flex>
        </Flex>

        <UserEdits isOpen={isModalOpen} onClose={onModalClose} />

        <Box w="90%" mt="20px">
          <CardLinksUser animes={watching} title="Assistindo" />
        </Box>
        <Box w="90%" mt="20px">
          <CardLinksUser animes={wantWatch} title="Quero Assistir" />
        </Box>
        <Box w="90%" mt="20px">
          <CardLinksUser animes={finished} title="Finalizados" />
        </Box>
      </Flex>
    </>
  );
};
