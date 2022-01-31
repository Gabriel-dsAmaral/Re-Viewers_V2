import { Box, Center, IconButton, Text, Textarea } from "@chakra-ui/react";
import { useComment } from "../../Providers/CommentsProvider";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { useAnime } from "../../Providers/AnimesProvider";
import { useUser } from "../../Providers/UserProvider";
import { useEffect, useState } from "react";
import { EditableComment } from "./editable";

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
    <Box>
      <Text>To omoimasu (comentarios):</Text>
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
        <Text>Registresse, faça login e junte-se a nossa comunidade!</Text>
      )}

      {!!accessToken
        ? comments.map((item, index) => (
            <Box key={index} border="2px solid blue" marginBottom="20px ">
              {Number(user.id) !== item.userId ? (
                <Text>{item.comment}</Text>
              ) : (
                <Box>
                  <EditableComment id={item.id} input={item.comment} />
                  <IconButton
                    bg="white"
                    icon={<FaTrashAlt size={30} />}
                    transition="scale .2s linear "
                    _hover={{
                      cursor: "pointer",
                      transform: "scale(1.05)",
                    }}
                    aria-label="supprimer"
                    borderRadius="10px"
                    onClick={() => handleDelete(item.id)}
                  />
                </Box>
              )}
            </Box>
          ))
        : comments.map((item, index) => (
            <Text key={index}>{item.comment}</Text>
          ))}
    </Box>
  );
};
