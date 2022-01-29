import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignupForm } from './SignupForm'
import { api } from '../../../services/api'
import { ModalSuccess } from '../ModalSuccess'
import { ModalError } from '../ModalError'

const signupSchema = yup.object().shape({
  name: yup.string().required('Precisamos do seu nome Otaku'),
  email: yup
    .string()
    .required('Must have a E-mail')
    .email('Esse e-mail é de outro mundo'),
  password: yup.string().required('Precisamos do seu codigo secreto'),
  confirm_password: yup
    .string()
    .required('Precisamos da confirmação do código secreto')
    .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais')
})

type SignupData = {
  [key: string]: string
}

interface ModalCartProps {
  isOpen: boolean
  onClose: () => void
}

export const Signup = ({ isOpen, onClose }: ModalCartProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm({
    resolver: yupResolver(signupSchema)
  })

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose
  } = useDisclosure()
  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose
  } = useDisclosure()

  const handleSignup = ({ name, email, password }: SignupData) => {
    api
      .post('/register', { name, email, password })
      .then(res => onModalSuccessOpen())
      .catch(err => onModalErrorOpen())
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background="primary">
          <ModalCloseButton />
          <ModalSuccess
            mess="Okaeri-nasai mase, Goshujin-sama!!!"
            isOpen={isModalSuccessOpen}
            onClose={onModalSuccessClose}
          />

          <ModalError
            mess="Deu Ruim"
            isOpen={isModalErrorOpen}
            onClose={onModalErrorClose}
          />

          <SignupForm
            handleSignup={handleSubmit(handleSignup)}
            register={register}
            errors={errors}
          />
        </ModalContent>
      </Modal>
    </>
  )
}
