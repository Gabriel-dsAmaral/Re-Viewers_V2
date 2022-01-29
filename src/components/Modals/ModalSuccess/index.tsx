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
import welcome from '../../../assets/welcome.jpg'

interface ModalSuccessProps {
  isOpen: boolean
  onClose: () => void
  mess: string
}

export const ModalSuccess = ({ isOpen, onClose, mess }: ModalSuccessProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white" bgColor="gold.sand" fontWeight="extrabold">
          {mess}
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
              Cadastro realizado com sucesso
            </Text>
            <Image border="2px solid" borderColor="grey.dark" src={welcome} />
            <Text
              color="grey.dark"
              fontWeight="bold"
              fontStyle="italic"
              fontSize="m"
            >
              Bem vindo novo Otaku!!!
            </Text>
          </Center>
        </ModalBody>

        <ModalFooter bgColor="gold.light50">
          <Button
            bgColor="grey.dark"
            color="white"
            _hover={{ background: 'grey.greyStone' }}
            onClick={onClose}
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
