import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'

interface ModalErrorProps {
  isOpen: boolean
  onClose: () => void
  mess: string
}

export const ModalError = ({ isOpen, onClose, mess }: ModalErrorProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white" bgColor="gold.sand">
          Algo de errado não esta certo!!!!
        </ModalHeader>
        <ModalBody>
          <Center flexDir="column">
            <Text fontWeight="bold" fontSize="lg">
              {mess}
            </Text>
          </Center>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button width="90%" colorScheme="red" onClick={onClose}>
            Tentar novamente
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
