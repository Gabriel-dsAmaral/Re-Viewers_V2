import { Flex, IconButton, Image, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useComment } from "../../Providers/CommentsProvider";

interface StyledTextAreaProps {
  img: string;
  name: string;
}

export const StyledTextArea = ({ img, name }: StyledTextAreaProps) => {
  const [input, setInput] = useState("");
  const { MakeComment, LoadComments } = useComment();

  const { id } = useParams<{ id: string }>();

  const handleMake = () => {
    if (input.length > 1) MakeComment(+id, input).then(() => LoadComments(+id));
  };

  return (
    <Flex
      maxWidth={["100%", "90%", "80%", "75%"]}
      padding="20px"
      borderRadius="8px"
      flexDirection="column"
    >
      <Flex
        fontWeight="900"
        fontSize="20px"
        fontStyle="italic"
        flexDirection="row"
        alignItems="center"
      >
        <Image
          border="1px solid"
          borderColor="grey.dark"
          w="58px"
          h="58px"
          marginRight="10px"
          borderRadius="8px"
          src="https://i.pinimg.com/280x280_RS/1a/2d/38/1a2d38f8916060f75fe4af01871bf8f0.jpg"
        />
        Jibun no namae: {name}
      </Flex>
      <Flex flexDirection="row" justifyContent="end" alignItems="end">
        <Textarea
          maxLength={100}
          textAlign="start"
          font-weigth="bold"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Lança a braba!"
          marginTop="15px"
          mr="10px"
        />

        <IconButton
          size="lg"
          aria-label="supprimer"
          icon={<FaCheck />}
          onClick={handleMake}
        />
      </Flex>
    </Flex>
  );
};
