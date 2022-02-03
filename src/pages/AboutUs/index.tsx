import { Flex, Img, Text } from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { Footer } from "../../components/Footer";
export const AboutUs = () => {
  return (
    <Flex height="100vh" alignItems="center">
      <Flex
        height="80%"
        width="57%"
        justifyContent="space-evenly"
        direction="column"
        alignItems="center"
      >
        <Text fontSize="33px">
          Re:Viewers, seu catalogo interativo-<em>desu</em>!
        </Text>
        <Text fontSize="23px" width="67%">
          Nós somos uma aplicação destinada ao publico otaku, possibilitando o
          usuario avaliar e comentar sobre seus animes favoritos, assim como
          descobrir novos animes.
        </Text>
        <Text fontSize="23px" width="67%">
          Somos facinados por animes, e assim como bons otakus, sempre estamos a
          procura de mais conteudo para consumir. Com isso em mente, a
          Re:Viewers surgiu, criando um catalogo dos melhores animes, para que
          os otakus de plantão sempre tenham o melhor conteudo! NHAA!!
        </Text>
      </Flex>
      <Flex>
        <Img margin="50px 0px 0pc 0pc" maxH="500px" src={logo} />
      </Flex>
      <Flex position="absolute" bottom="0">
        <Footer />
      </Flex>
    </Flex>
  );
};
