import { Flex, Text } from "@chakra-ui/react";
import { Animecard } from "../AnimeCard";
interface Rate {
  userId: number;
  value: number;
}
interface AnimesData {
  myListStatus?: string;
  id: string;
  title: string;
  categories: Array<object>;
  rate?: Array<Rate>;
  banner: string;
  image: string;
  original_title: string;
  status: string;
  launch_data: string;
  studio: string;
  sinopse: string;
  userId?: number;
  data?: object;
}
interface CardLinksProps {
  title: string;
  list: IUserListStatus[];
}

type IUserListStatus = {
  id: string;
  watching_status: string;
  anime: AnimesData;
};

export const CardLinksUser = ({ title, list }: CardLinksProps) => {
  console.log("cardlinkuser", list);
  return (
    <Flex
      direction="column"
      maxW="100%"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gold.sand20"
      borderRadius="8px"
      border="2px solid #D3A16F"
      paddingY="30px"
    >
      <Text
        textAlign="center"
        color="grey.greyStone"
        fontWeight="700"
        fontSize="28px"
        lineHeight="25px"
      >
        {title}
      </Text>
      <Flex
        w="90%"
        wrap="nowrap"
        gap={["20px", "20px", "20px", "30px"]}
        padding={["15px", "15px", "15px", "20px"]}
        paddingX={["0", "0"]}
        alignItems="center"
        justifyContent="flex-start"
        overflow="overlay"
        maxH="480px"
      >
        {list.length > 0 ? (
          list.map((e) => <Animecard anime={e.anime} key={list.indexOf(e)} />)
        ) : (
          <Text
            textAlign="center"
            color="grey.greyStone"
            fontWeight="500"
            fontSize="24px"
            lineHeight="25px"
          >
            Vazio por enquanto
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
