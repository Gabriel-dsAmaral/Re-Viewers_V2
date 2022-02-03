import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface CommentProps {
  name: string;
  comment: string;
  img: string;
}

export const Comment = ({ name, comment, img }: CommentProps) => {
  return (
    <Box
      maxWidth={["90%", "80%", "80%", "75%"]}
      borderBottom="1px solid"
      padding="20px"
    >
      <Flex
        fontStyle="italic"
        fontWeight="900"
        fontSize="20px"
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
        {name}
      </Flex>
      <Text marginLeft="65px" textAlign="start" font-weigth="bold">
        {comment}
      </Text>
    </Box>
  );
};
