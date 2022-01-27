import { FormControl, InputGroup, InputRightElement } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import { Input } from "./Input";

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
        borderRadius="10px"
      >
        <InputRightElement
          mt="1"
          mr="1.5"
          bg="white"
          borderRadius="5px"
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
          type="search"
          name="title"
          // placeholder="Digitar Pesquisa"
          defaultValue=""
          onChangeCapture={(event: React.ChangeEvent<HTMLInputElement>) =>
            filterAnimes(event.target.value)
          }
          border="none"
          variant="filled"
          bg="#CFCFDE"
          paddingRight="55px"
          color="black"
          _hover={{ filter: "brightness(1.1)" }}
          _focus={{ bg: "#CFCFDE" }}
        />
      </InputGroup>
    </FormControl>
  );
};
