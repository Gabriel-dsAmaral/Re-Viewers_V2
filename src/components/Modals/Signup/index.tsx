import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignupForm } from "./SignupForm";
import { ModalSuccess } from "../ModalSuccess";
import { ModalError } from "../ModalError";
import { useUser } from "../../../Providers/UserProvider";

const signupSchema = yup.object().shape({
  name: yup.string().required("Precisamos do seu nome Otaku"),
  email: yup
    .string()
    .required("Must have a E-mail")
    .email("Esse e-mail é de outro mundo"),
  password: yup.string().required("Precisamos do seu codigo secreto"),
  confirm_password: yup
    .string()
    .required("Precisamos da confirmação do código secreto")
    .oneOf([yup.ref("password"), null], "Senhas devem ser iguais"),
});

type SignupData = {
  [key: string]: string;
};

interface ModalCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Signup = ({ isOpen, onClose }: ModalCartProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

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

  const { sigNup } = useUser();

  const handleSignup = ({ name, email, password }: SignupData) => {
    sigNup({
      name,
      email,
      password,
      userImg:
        "http://pm1.narvii.com/6861/44017694789ca7409a0a9a30a8c0be4a7e2bd9f8r1-800-713v2_00.jpg",
    })
      .then(() => onClose())
      .then((res) => onModalSuccessOpen())
      .catch((err) => onModalErrorOpen());
    reset();
  };

  return (
    <>
      <ModalSuccess
        result="Bem vindo novo Otaku!!!"
        message="Cadastro realizado com sucesso"
        title="Okaeri-nasai mase, Goshujin-sama!!!"
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
        img=""
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background="primary">
          <ModalCloseButton />

          <ModalError
            title="Algo de errado não esta certo"
            message="Deu Ruim!!!"
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
  );
};
