import { Flex, Img, Text } from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import logo from "../../assets/logo.png";

export const Developers = () => {
  return (
    <Flex
      minH="100vh"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      flexDirection="column"
      bg="white"
    >
      <Flex
        minH={"calc(100vh - 40px)"}
        alignItems="center"
        justifyContent="center"
        flexDirection={["column", "column", "row", "row"]}
        gap={["0px", "20px", "20px", "20px"]}
      >
        <Img
          display={["none", "none", "flex", "flex"]}
          height={["0px", "0px", "100%", "100%"]}
          width={["0px", "0px", "50%", "50%"]}
          src={logo}
          padding="6%"
        />

        <Flex
          width={["100%", "100%", "50%", "50%"]}
          Width="100%"
          maxW="480px"
          Heigh="inherit"
          justifyContent="stretch"
          direction="column"
          alignItems="center"
          padding={["0px", "0px", "40px", "40px"]}
          color="grey.greyStone"
          gap="20px"
        >
          <Text
            fontSize="33px"
            fontWeight="bold"
            textShadow="3px 2px #ccc"
            color="black"
          >
            Nosso time-<em>desu</em>!
          </Text>
          <Flex width="100%" align="center" paddingY="10px">
            <Img
              marginRight="5px"
              borderRadius="100%"
              maxH="50px"
              maxW="50px"
              src="https://media-exp1.licdn.com/dms/image/D4E35AQHfjpYd3i6hkQ/profile-framedphoto-shrink_100_100/0/1643035637332?e=1643997600&v=beta&t=StMmFI8pRUcvgAQbvaJtyhVRNlOgXrzgOIw8tqQBxY8"
            />
            <Text
              marginTop="5px"
              fontSize="20px"
              width="100%"
              textAlign="center"
              fontWeight="700"
            >
              Fernão Shiotsuki - PO
            </Text>
            <Img
              maxH="50px"
              maxW="50px"
              onClick={() =>
                window.location.replace(
                  "https://www.linkedin.com/in/fern%C3%A3o-shiotsuki-49497a203/"
                )
              }
              src="https://thumbs.dreamstime.com/b/vetor-social-do-logotipo-cone-dos-meios-de-linkedin-no-elemento-preto-fundo-branco-cone-logotipos-sociais-apropriados-para-142153162.jpg"
            />
          </Flex>
          <Flex width="100%" align="center" paddingY="10px">
            <Img
              marginRight="5px"
              borderRadius="100%"
              maxH="50px"
              maxW="50px"
              src="https://media-exp1.licdn.com/dms/image/D4D35AQFu0W5QNOdCLw/profile-framedphoto-shrink_800_800/0/1643393221492?e=1644004800&v=beta&t=aIaf-PgQBjKXnrS2kuAUbmMoTiCqLx3kEVsnt-w32VA"
            />
            <Text
              marginTop="5px"
              fontSize="20px"
              width="100%"
              textAlign="center"
              fontWeight="700"
            >
              Fernão Shiotsuki - PO
            </Text>
            <Img
              maxH="50px"
              maxW="50px"
              onClick={() =>
                window.location.replace(
                  "https://www.linkedin.com/in/marcos-vinicius-071510220/"
                )
              }
              src="https://thumbs.dreamstime.com/b/vetor-social-do-logotipo-cone-dos-meios-de-linkedin-no-elemento-preto-fundo-branco-cone-logotipos-sociais-apropriados-para-142153162.jpg"
            />
          </Flex>

          <Flex width="100%" align="center" paddingY="10px">
            <Img
              marginRight="5px"
              borderRadius="100%"
              maxH="50px"
              maxW="50px"
              src="https://media-exp1.licdn.com/dms/image/D4D35AQG3R95FKSCZog/profile-framedphoto-shrink_800_800/0/1643035490168?e=1644004800&v=beta&t=qJIhVZ6GRkB4ZGvBNvz7_IM6QEsRBb1DGWxPKzQ-i-s"
            />
            <Text
              marginTop="5px"
              fontSize="20px"
              width="100%"
              textAlign="center"
              fontWeight="700"
            >
              Cristian Tacca - SM
            </Text>
            <Img
              maxH="50px"
              maxW="50px"
              onClick={() =>
                window.location.replace(
                  "https://www.linkedin.com/in/cristian-tacca-837522182/"
                )
              }
              src="https://thumbs.dreamstime.com/b/vetor-social-do-logotipo-cone-dos-meios-de-linkedin-no-elemento-preto-fundo-branco-cone-logotipos-sociais-apropriados-para-142153162.jpg"
            />
          </Flex>

          <Flex width="100%" align="center" paddingY="10px">
            <Img
              marginRight="5px"
              borderRadius="100%"
              maxH="50px"
              maxW="50px"
              src="https://media-exp1.licdn.com/dms/image/C5603AQGTg5orI4gM2A/profile-displayphoto-shrink_200_200/0/1618296501324?e=1649289600&v=beta&t=txH6XcsgAHNyLkjcdMmodRcA7lnVC6-jYUGRVF7YlBk"
            />
            <Text
              marginTop="5px"
              fontSize="20px"
              width="100%"
              textAlign="center"
              fontWeight="700"
            >
              Robson Martins - QA
            </Text>
            <Img
              maxH="50px"
              maxW="50px"
              onClick={() =>
                window.location.replace("https://www.linkedin.com/in/rbsndev3/")
              }
              src="https://thumbs.dreamstime.com/b/vetor-social-do-logotipo-cone-dos-meios-de-linkedin-no-elemento-preto-fundo-branco-cone-logotipos-sociais-apropriados-para-142153162.jpg"
            />
          </Flex>

          <Flex width="100%" align="center" paddingY="10px">
            <Img
              marginRight="5px"
              borderRadius="100%"
              maxH="50px"
              maxW="50px"
              src="https://media-exp1.licdn.com/dms/image/C5603AQG-aHQv1e9NaQ/profile-displayphoto-shrink_200_200/0/1627314222030?e=1649289600&v=beta&t=Lmka7CdQCvuTSO2oBGmp46xFDKPJQwAOjm3ogZjdg38"
            />
            <Text
              marginTop="5px"
              fontSize="20px"
              width="100%"
              textAlign="center"
              fontWeight="700"
            >
              Gabriel Amaral - QA
            </Text>
            <Img
              maxH="50px"
              maxW="50px"
              onClick={() =>
                window.location.replace(
                  "https://www.linkedin.com/in/gabriel-amaral-59181b218/"
                )
              }
              src="https://thumbs.dreamstime.com/b/vetor-social-do-logotipo-cone-dos-meios-de-linkedin-no-elemento-preto-fundo-branco-cone-logotipos-sociais-apropriados-para-142153162.jpg"
            />
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};
