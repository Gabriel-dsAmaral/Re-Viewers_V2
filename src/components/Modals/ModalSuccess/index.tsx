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
import { useHistory } from 'react-router-dom'

interface ModalSuccessProps {
  isOpen: boolean
  onClose: () => void
}

export const ModalSuccess = ({ isOpen, onClose }: ModalSuccessProps) => {
  const history = useHistory()
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white" bgColor="gray.gray" fontWeight="extrabold">
          Vish
        </ModalHeader>
        <ModalBody>
          <Center flexDir="column">
            <Text fontWeight="extrabold" fontStyle="italic" fontSize="1.3rem">
              Cadastro realizado com sucesso
            </Text>
            <Text fontStyle="italic" fontSize="m">
              Bem vindo novo Otaku
            </Text>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
