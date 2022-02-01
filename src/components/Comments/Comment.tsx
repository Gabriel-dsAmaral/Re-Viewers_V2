import { Box, Flex, Image, Text } from "@chakra-ui/react";

interface CommentProps {
  name: string;
  comment: string;
}

export const Comment = ({ name, comment }: CommentProps) => {
  return (
    <Box
      maxWidth={["90%", "80%", "80%", "75%"]}
      borderBottom="1px solid"
      padding="20px"
    >
      <Flex alignItems="center">
        <Image
          border="1px solid"
          borderColor="grey.dark"
          w="58px"
          h="58px"
          marginRight="10px"
          borderRadius="8px"
          src="https://i.pinimg.com/280x280_RS/1a/2d/38/1a2d38f8916060f75fe4af01871bf8f0.jpg"
        />
        {name}
      </Flex>
      <Text marginLeft="65px" textAlign="start" font-weigth="bold">
        {comment}
      </Text>
    </Box>
  );
};
