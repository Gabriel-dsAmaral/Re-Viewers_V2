import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useComment } from "../../Providers/CommentsProvider";
import { useAnime } from "../../Providers/AnimesProvider";
import { useUser } from "../../Providers/UserProvider";
import { useEffect } from "react";
import { EditableComment } from "./EditableComment";
import { CallingCard } from "./Calling";
import { Comment } from "./Comment";
import { StyledTextArea } from "./StyledTextArea.";

export const Comments = () => {
  const { DeleteComment, LoadComments, comments } = useComment();
  const { selectedAnime } = useAnime();
  const { user, accessToken } = useUser();

  const handleDelete = (id: number) => {
    DeleteComment(id).then(() => LoadComments(selectedAnime.id));
  };

  useEffect(() => {
    LoadComments(selectedAnime.id);
  }, [selectedAnime, LoadComments]);

  const Margin = useBreakpointValue({ base: "0px", lg: "300px" });

  return (
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
  );
};
