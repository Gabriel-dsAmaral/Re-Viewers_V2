import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface Rate {
  userId: number;
  value: number;
}

interface AnimesData {
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
  usersWhoRated?: Array<number>;
}

interface ModalErrorProps {
  status: string;
  onClose: () => void;
  isOpen: boolean;
}

export const ModalScore = ({ isOpen, onClose, status }: ModalErrorProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Status atualizado com sucesso!</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter j>
          <Button
            width="90%"
            bgColor="grey.dark"
            color="white"
            _hover={{ background: "grey.greyStone" }}
          >
            Avaliar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
