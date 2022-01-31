import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  useEditableControls,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { useComment } from "../../Providers/CommentsProvider";

interface EditableCommentProps {
  id: number;
  input: string;
}

export const EditableComment = ({ id, input }: EditableCommentProps) => {
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
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="supprimer"
          icon={<FaCheck />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="supprimer"
          icon={<FaTimes />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="supprimer"
          size="sm"
          icon={<FaEdit />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

  return (
    <Editable
      textAlign="center"
      value={value}
      fontSize="2xl"
      isPreviewFocusable={false}
      onChangeCapture={(e: ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
      onSubmit={() => EditComment({ CommentId: id, comment: value })}
    >
      <EditablePreview />
      <EditableInput />
      <EditableControls />
    </Editable>
  );
};
