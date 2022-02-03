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
  Text
} from '@chakra-ui/react'
import erabe from '../../../assets/erabe.png'

interface ModalSuccessProps {
  isOpen: boolean
  onClose: () => void
  result: string
  title: string
  message: string
}

export const ModalConfirm = ({
  isOpen,
  onClose,
  title,
  message,
  result
}: ModalSuccessProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white" bgColor="gold.sand" fontWeight="extrabold">
          {title}
        </ModalHeader>
        <ModalBody bgColor="gold.light50">
          <Center flexDir="column">
            <Text
              as="h2"
              textAlign="center"
              fontWeight="extrabold"
              fontStyle="italic"
              fontSize="1.3rem"
              color="grey.dark"
            >
              {message}
            </Text>
            <Image border="2px solid" borderColor="grey.dark" src={erabe} />
            <Text
              color="grey.dark"
              fontWeight="bold"
              fontStyle="italic"
              fontSize="m"
            >
              {result}
            </Text>
          </Center>
        </ModalBody>

        <ModalFooter justifyContent="space-between" bgColor="gold.light50">
          <Button colorScheme="red" onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="green" onClick={onClose}>
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
