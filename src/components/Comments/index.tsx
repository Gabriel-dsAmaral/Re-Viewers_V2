import { Box, Text, useBreakpointValue } from "@chakra-ui/react";
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
        <StyledTextArea
          name="Rodolfo"
          img="https://i.pinimg.com/280x280_RS/1a/2d/38/1a2d38f8916060f75fe4af01871bf8f0.jpg"
        />
      ) : (
        <CallingCard />
      )}

      {!!accessToken
        ? comments.map((item, index) => (
            <Box key={index}>
              {Number(user.id) !== item.userId ? (
                <Comment comment={item.comment} name={item.name} />
              ) : (
                <EditableComment
                  key={index}
                  id={item.id}
                  input={item.comment}
                  name={item.name}
                  img="https://i.pinimg.com/280x280_RS/1a/2d/38/1a2d38f8916060f75fe4af01871bf8f0.jpg"
                  callback={handleDelete}
                />
              )}
            </Box>
          ))
        : comments.map((item, index) => (
            <Comment key={index} comment={item.comment} name={item.name} />
          ))}
    </Box>
  );
};
