import {
  Button,
  Flex,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
interface ModalMyListStatusProps {
  onClose: () => void;
  isOpen: boolean;
}

export const ModalMyListStatus = ({
  isOpen,
  onClose,
}: ModalMyListStatusProps) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        color="white"
        bgColor="gold.sand"
        fontWeight="extrabold"
        top="150px"
      >
        <ModalHeader textAlign="center">Anime adicionado a lista!</ModalHeader>
        <ModalFooter>
          <Flex
            width="100%"
            gap="10px"
            flexFlow="column"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              width="80%"
              bgColor="grey.dark"
              color="white"
              _hover={{ background: "grey.greyStone" }}
              onClick={() => navigate("/user")}
            >
              Ir para página do usuário
            </Button>
            <Button
              width="80%"
              bgColor="grey.dark"
              color="white"
              _hover={{ background: "grey.greyStone" }}
              onClick={onClose}
            >
              Fechar modal
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
