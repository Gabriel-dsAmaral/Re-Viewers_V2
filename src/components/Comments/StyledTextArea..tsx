import {
  Flex,
  IconButton,
  Image,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useComment } from "../../Providers/CommentsProvider";
import { ModalSuccess } from "../Modals/ModalSuccess";

interface StyledTextAreaProps {
  img: string;
  name: string;
}

export const StyledTextArea = ({ img, name }: StyledTextAreaProps) => {
  const [input, setInput] = useState("");
  const { MakeComment, LoadComments } = useComment();

  const { id } = useParams<{ id: any }>();

  const handleMake = () => {
    if (input.length > 1) {
      MakeComment(+id, input)
        .then(() => LoadComments(+id))
        .then(() => {
          setInput("");
          onModalSuccessOpen();
        });
    }
  };

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();

  return (
    <>
      <ModalSuccess
        result="Comenta mais!! Onegaii Shounen"
        message="Comentario realizado com sucesso"
        title="Arigato Gozaimasu!!!"
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
        img="https://sm.ign.com/t/ign_pt/news/f/funimation/funimation-completes-crunchyroll-acquisition-in-anime-stream_3wk3.h720.jpg"
      />
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
            src={img}
          />
          Watashi no namae wa: {name}
        </Flex>
        <Flex flexDirection="row" justifyContent="end" alignItems="end">
          <Textarea
            maxLength={100}
            textAlign="start"
            font-weigth="bold"
            value={input}
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
    </>
  );
};
