import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Image,
  useDisclosure,
  useEditableControls,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

import { FaCheck, FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useComment } from "../../Providers/CommentsProvider";
import { ModalSuccess } from "../Modals/ModalSuccess";

interface EditableCommentProps {
  id: number;
  input: string;
  name: string;
  img: string;
  callback: (id: number) => void;
}

export const EditableComment = ({
  id,
  input,
  name,
  img,
  callback,
}: EditableCommentProps) => {
  const { EditComment } = useComment();

  const [value, setValue] = useState<string>(input);

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <Flex mt="5px" justifyContent="flex-end" size="sm">
        <IconButton
          mr="8px"
          size="lg"
          aria-label="supprimer"
          icon={<FaCheck />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          size="lg"
          aria-label="supprimer"
          icon={<FaTimes />}
          {...getCancelButtonProps()}
        />
      </Flex>
    ) : (
      <Flex justifyContent="flex-end">
        <IconButton
          mr="8px"
          aria-label="supprimer"
          size="lg"
          icon={<FaEdit />}
          {...getEditButtonProps()}
        />
        <IconButton
          aria-label="supprimer"
          size="lg"
          icon={<FaTrashAlt />}
          {...getCancelButtonProps()}
          onClick={() => callback(id)}
        />
      </Flex>
    );
  };

  return (
    <>
      <ModalSuccess
        result="Continue assim amiguinho e seja educado viu!"
        message="Comentario editado com sucesso"
        title=""
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
        img="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/171561980/original/255b2e8e746f932086a6c5d8541a77e9cb4d34d4/make-cute-chibi-arrt.png"
      />
      <Box
        maxWidth={["90%", "80%", "80%", "75%"]}
        borderBottom="1px solid"
        padding="20px"
      >
        <Flex
          fontStyle="italic"
          fontWeight="900"
          fontSize="20px"
          alignItems="center"
        >
          <Image
            border="1px solid"
            borderColor="grey.dark"
            w="58px"
            h="58px"
            marginRight="10px"
            borderRadius="8px"
            src={img}
          />
          {name}
        </Flex>
        <Editable
          maxLength="100"
          marginLeft="65px"
          textAlign="start"
          value={value}
          isPreviewFocusable={false}
          fontWeight="bold"
          onChangeCapture={(e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
          onSubmit={() =>
            EditComment({ CommentId: id, comment: value }).then((res) =>
              onModalSuccessOpen()
            )
          }
        >
          <EditablePreview />
          <EditableInput />
          <EditableControls />
        </Editable>
      </Box>
    </>
  );
};
