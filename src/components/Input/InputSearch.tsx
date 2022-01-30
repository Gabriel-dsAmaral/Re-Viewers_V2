import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";

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
          bg="transparent"
          color={"white"}
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
          <BiSearchAlt size={30} />
        </InputRightElement>
        <Input
          background="transparent"
          type="search"
          name="title"
          placeholder="Digitar Pesquisa"
          defaultValue=""
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            filterAnimes(event.target.value)
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
