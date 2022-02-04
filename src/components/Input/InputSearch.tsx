import {
  InputRightElement,
  FormControl,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { useAnime } from "../../Providers/AnimesProvider";

interface InputSearchProps {
  searchBox: () => void;
}

export const InputSearch = ({ searchBox }: InputSearchProps) => {
  const { searchAnime } = useAnime();

  return (
    <FormControl padding="5px">
      <InputGroup
        w={["100%", "100%", "30vw", "30vw"]}
        border="1px solid #BDBDBD"
        borderRadius="5px"
      >
        <InputRightElement
          width="40px"
          height="40px"
          bg="transparent"
          color="white"
          borderRadius="10px"
          transition="filter .1s linear "
          _hover={{
            filter: "brightness(1.1)",
            cursor: "pointer",
          }}
          _active={{ filter: "brightness(.8)" }}
          aria-label="supprimer"
          onClick={searchBox}
        >
          <BiSearchAlt size={30} />
        </InputRightElement>
        <Input
          background="transparent"
          type="search"
          name="title"
          placeholder="Digitar Pesquisa"
          defaultValue=""
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            searchAnime(event.target.value)
          }
          border="none"
          variant="filled"
          paddingRight="55px"
          color="white"
          _hover={{ filter: "brightness(1.1)" }}
        />
      </InputGroup>
    </FormControl>
  );
};
