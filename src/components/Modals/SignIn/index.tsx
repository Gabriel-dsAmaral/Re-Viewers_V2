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
import { SignInForm } from "./SignInForm";
import { ModalError } from "../ModalError";
import { useUser } from "../../../Providers/UserProvider";

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .required("Must have a E-mail")
    .email("Esse e-mail é de outro mundo"),
  password: yup.string().required("Precisamos do seu codigo secreto"),
});

type SignInData = {
  [key: string]: string;
};

interface ModalCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignIn = ({ isOpen, onClose }: ModalCartProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });

  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  const { signIn } = useUser();

  const handleSignIn = ({ email, password }: SignInData) => {
    signIn({ password: password, email: email })
      .then(() => onClose())
      // .then(() => window.location.reload())
      .catch((err) => onModalErrorOpen());
    reset();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent background="primary">
          <ModalCloseButton />

          <ModalError
            title="Usuario ou senha invalidos!!!"
            message="Algo de errado não esta certo"
            isOpen={isModalErrorOpen}
            onClose={onModalErrorClose}
          />

          <SignInForm
            handleSignIn={handleSubmit(handleSignIn)}
            register={register}
            errors={errors}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
