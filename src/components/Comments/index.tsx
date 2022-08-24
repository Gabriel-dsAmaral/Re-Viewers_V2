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
  const { delComment, getComments, comments } = useComment();
  const { selectedAnime } = useAnime();
  const { user, accessToken } = useUser();

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();

  const handleDelete = (id: string) => {
    delComment(id).then(() => getComments(selectedAnime.id));
    onModalSuccessOpen();
  };

  useEffect(() => {
    getComments(selectedAnime.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnime]);

  console.log(comments);

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
          <StyledTextArea name={user.first_name} img={user.avatar} />
        ) : (
          <CallingCard />
        )}
        <Flex flexDirection="column-reverse">
          {!!accessToken
            ? comments.map((item, index) => (
                <Box key={index}>
                  {user.id !== item.user.user_id ? (
                    <Comment
                      img={item.user.avatar}
                      comment={item.comment}
                      name={item.user.first_name}
                    />
                  ) : (
                    <EditableComment
                      key={index}
                      id={item.comment_id}
                      input={item.comment}
                      name={item.user.first_name}
                      img={item.user.avatar}
                      callback={handleDelete}
                    />
                  )}
                </Box>
              ))
            : comments.map((item, index) => (
                <Comment
                  img={item.user.avatar}
                  key={index}
                  comment={item.comment}
                  name={item.user.first_name}
                />
              ))}
        </Flex>
      </Box>
    </>
  );
};
