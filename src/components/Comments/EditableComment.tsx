import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Image,
  useEditableControls,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

import { FaCheck, FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useComment } from "../../Providers/CommentsProvider";

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
  function EditableControls() {
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
  }

  return (
    <Box
      maxWidth={["90%", "80%", "80%", "75%"]}
      borderBottom="1px solid"
      padding="20px"
    >
      <Flex alignItems="center">
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
        marginLeft="65px"
        textAlign="start"
        value={value}
        isPreviewFocusable={false}
        font-fontWeight="bold"
        onChangeCapture={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        onSubmit={() => EditComment({ CommentId: id, comment: value })}
      >
        <EditablePreview />
        <EditableInput />
        <EditableControls />
      </Editable>
    </Box>
  );
};
