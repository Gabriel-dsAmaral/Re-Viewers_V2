import {
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Input } from "../../Input/Input";
import { ModalError } from "../ModalError";
import { ModalSuccess } from "../ModalSuccess";
import { useUser } from "../../../Providers/UserProvider";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { api } from "../../../services/api";
import { Button } from "../../Button";

interface UserEditsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserEdits = ({ isOpen, onClose }: UserEditsProps) => {
  const { user, ChangeAvatar, EditUser } = useUser();
  const [avatars, setAvatars] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [avatar, setAvatar] = useState("");

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  useEffect(() => {
    api.get("/avatars").then((res) => setAvatars(res.data));
  }, []);

  const handleNameEdit = () => {
    if (input !== "")
      EditUser({ name: input }).catch((err) => onModalErrorOpen());
  };

  const handleAvatarEdit = () => {
    if (user.userImg !== avatar)
      ChangeAvatar({ userImg: avatar }).catch((err) => onModalErrorOpen());
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="20px" background="primary">
          <ModalCloseButton />

          <ModalError
            title="Algo de errado não esta certo"
            message="Deu Ruim!!!"
            isOpen={isModalErrorOpen}
            onClose={onModalErrorClose}
          />
          <Flex mb="15px" justifyContent={"center"} alignItems={"end"}>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Lança a braba!"
              name={!!user.name ? "" : user.name}
              label="Novo user name"
              mt="15px"
            />
            <IconButton
              ml="5px"
              mb="1px"
              size="lg"
              aria-label="supprimer"
              icon={<FaCheck />}
              onClick={handleNameEdit}
            />
          </Flex>

          <Flex
            direction="column"
            maxW="100%"
            justifyContent="center"
            alignItems="center"
            backgroundColor="gold.sand20"
            borderRadius="8px"
            border="2px solid #D3A16F"
            paddingY="30px"
          >
            <Text
              textAlign="center"
              color="grey.greyStone"
              fontWeight="700"
              fontSize="28px"
              lineHeight="25px"
            >
              Novo Avatar:
            </Text>
            <Flex
              w="90%"
              wrap="nowrap"
              gap={["20px", "20px", "20px", "30px"]}
              padding={["15px", "15px", "15px", "20px"]}
              paddingX={["0", "0"]}
              alignItems="end"
              justifyContent="flex-start"
              overflow="overlay"
              maxH="480px"
            >
              {avatars.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  w="155px"
                  h="155px"
                  _hover={{ filter: "brightness(.9)" }}
                  border={img === avatar ? "3px solid brown" : "none"}
                  borderRadius={img === avatar ? "8px" : "none"}
                  onClick={() => setAvatar(img)}
                />
              ))}
            </Flex>
            <Button onClick={handleAvatarEdit} model="3" mt="15px">
              Alterar avatar
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
