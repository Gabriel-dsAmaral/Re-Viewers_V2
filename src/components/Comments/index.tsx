import {
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useComment } from "../../Providers/CommentsProvider";
import { useAnime } from "../../Providers/AnimesProvider";
import { useUser } from "../../Providers/UserProvider";
import { useEffect } from "react";
import { EditableComment } from "./EditableComment";
import { CallingCard } from "./Calling";
import { Comment } from "./Comment";
import { StyledTextArea } from "./StyledTextArea.";
import { ModalSuccess } from "../Modals/ModalSuccess";

export const Comments = () => {
  const { DeleteComment, LoadComments, comments } = useComment();
  const { selectedAnime } = useAnime();
  const { user, accessToken } = useUser();

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();

  const handleDelete = (id: number) => {
    DeleteComment(id).then(() => LoadComments(selectedAnime.id));
    onModalSuccessOpen();
  };

  useEffect(() => {
    LoadComments(selectedAnime.id);
  }, [selectedAnime, LoadComments]);

  const Margin = useBreakpointValue({ base: "0px", lg: "300px" });

  return (
    <>
      <ModalSuccess
        result="NOOOOOOOOOOOOOOOOOOOOOOO...."
        message="Por que voce fez isso?"
        title="Tururuuuuuu..."
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
        img="https://cdn.myanimelist.net/r/560x300/s/common/uploaded_files/1446435249-fa90bbc0193df219dffb8b473b8f4b15.jpeg?s=733a33ce219c47aff743178eb0b59f60"
      />
      <Box ml={Margin}>
        <Text fontWeight="SemiBold" fontSize="24px" color="primary">
          To omoimasu (comentarios):
        </Text>
        {!!accessToken ? (
          <StyledTextArea name={user.name} img={user.userImg} />
        ) : (
          <CallingCard />
        )}
        <Flex flexDirection="column-reverse">
          {!!accessToken
            ? comments.map((item, index) => (
                <Box key={index}>
                  {Number(user.id) !== item.userId ? (
                    <Comment
                      img={item.userImg}
                      comment={item.comment}
                      name={item.name}
                    />
                  ) : (
                    <EditableComment
                      key={index}
                      id={item.id}
                      input={item.comment}
                      name={item.name}
                      img={item.userImg}
                      callback={handleDelete}
                    />
                  )}
                </Box>
              ))
            : comments.map((item, index) => (
                <Comment
                  img={item.userImg}
                  key={index}
                  comment={item.comment}
                  name={item.name}
                />
              ))}
        </Flex>
      </Box>
    </>
  );
};
