import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import aqua from "../../../assets/aqua.gif";

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const ModalError = ({
  isOpen,
  onClose,
  title,
  message,
}: ModalErrorProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background="grey.light">
        <ModalHeader fontSize="1.5rem" color="white" bgColor="red">
          {title}
        </ModalHeader>
        <ModalBody>
          <Center flexDir="column">
            <Image width="200px" src={aqua} />
          </Center>
        </ModalBody>
        <Text
          textAlign="center"
          color="white"
          bgColor="red"
          width="100%"
          fontWeight="bold"
          fontSize="20px"
        >
          {message}
        </Text>

        <ModalFooter justifyContent="center">
          <Button width="90%" colorScheme="red" onClick={onClose}>
            Tentar novamente
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
