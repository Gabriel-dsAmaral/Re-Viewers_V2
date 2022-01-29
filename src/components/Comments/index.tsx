import { Box, Center, IconButton, Text, Textarea } from "@chakra-ui/react";
import { useComment } from "../../Providers/CommentsProvider";
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import { useAnime } from "../../Providers/AnimesProvider";
import { useState } from "react";

export const Comments = () => {
  const [input, setInput] = useState("");
  const { DeleteComment, EditComment, LoadComments, MakeComment, comments } =
    useComment();
  const { selectedAnime } = useAnime();

  const handleDelete = (id: number) => {
    DeleteComment(id).then(() => LoadComments(selectedAnime.id));
  };

  const handleMake = () => {
    if (input.length > 1)
      MakeComment(selectedAnime.id, input).then(() =>
        LoadComments(selectedAnime.id)
      );
  };

  return (
    <>
      <Center>
        <Textarea
          onChange={(e) => setInput(e.target.value)}
          placeholder="Lança a braba!"
          w="500px"
          h="200px"
          cursor="default"
          // isDisabled={true}
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

      {comments.map((item) => (
        <>
          <Box backgroundColor="tomato" marginBottom="20px ">
            <Text>{item.comment}</Text>
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
        </>
      ))}
    </>
  );
};
