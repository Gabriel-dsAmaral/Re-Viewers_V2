import {
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useComment } from "../../Providers/CommentsProvider";
import { FaCheck } from "react-icons/fa";
import { useAnime } from "../../Providers/AnimesProvider";
import { useUser } from "../../Providers/UserProvider";
import { useEffect, useState } from "react";
import { EditableComment } from "./EditableComment";
import { CallingCard } from "./Calling";
import { Comment } from "./Comment";

export const Comments = () => {
  const [input, setInput] = useState("");
  const { DeleteComment, LoadComments, MakeComment, comments } = useComment();
  const { selectedAnime } = useAnime();
  const { user, accessToken } = useUser();

  const handleDelete = (id: number) => {
    DeleteComment(id).then(() => LoadComments(selectedAnime.id));
  };

  const handleMake = () => {
    if (input.length > 1)
      MakeComment(selectedAnime.id, input).then(() =>
        LoadComments(selectedAnime.id)
      );
  };
  console.log(comments);

  useEffect(() => {
    LoadComments(selectedAnime.id);
  }, [selectedAnime]);

  return (
    <Box ml={["0px", "0px", "300px", "300px"]}>
      <Text fontWeight="SemiBold" fontSize="24px" color="primary">
        To omoimasu (comentarios):
      </Text>
      {!!accessToken ? (
        <Center>
          <Textarea
            onChange={(e) => setInput(e.target.value)}
            placeholder="Lança a braba!"
            w="500px"
            h="200px"
            cursor="default"
          />
          <IconButton
            bg="white"
            icon={<FaCheck size={30} />}
            transition="scale .2s linear "
            _hover={{
              cursor: "pointer",
              transform: "scale(1.05)",
            }}
            aria-label="supprimer"
            borderRadius="10px"
            onClick={() => handleMake()}
          />
        </Center>
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
