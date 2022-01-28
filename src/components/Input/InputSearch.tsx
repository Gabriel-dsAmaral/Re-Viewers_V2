import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
// import { Input } from "./Input";

interface InputSearchProps {
  closeInputSearch: () => void;
  filterAnimes: (inputValue: string) => void;
}

export const InputSearch = ({
  closeInputSearch,
  filterAnimes,
}: InputSearchProps) => {
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
          bg="white"
          borderRadius="10px"
          transition="filter .1s linear "
          _hover={{
            filter: "brightness(1.1)",
            cursor: "pointer",
          }}
          _active={{ filter: "brightness(.8)" }}
          aria-label="supprimer"
          onClick={closeInputSearch}
        >
          <BiSearchAlt color="gray.100" width="100%" />
        </InputRightElement>
        <Input
          type="search"
          name="title"
          placeholder="Digitar Pesquisa"
          defaultValue=""
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            filterAnimes(event.target.value)
          }
          border="none"
          variant="filled"
          bg="gray.0"
          paddingRight="55px"
          color="gray.300"
          _hover={{ filter: "brightness(1.1)" }}
          _focus={{ bg: "gray.0" }}
        />
      </InputGroup>
    </FormControl>
  );
};
