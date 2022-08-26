import { Flex, Img, Text } from "@chakra-ui/react";
import { Footer } from "../../components/Footer";
import logo from "../../assets/logo.png";
import ln from "../../assets/linkedin.png";

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
          width={["0px", "0px", "45%", "45%"]}
          src={logo}
          padding="6%"
        />

        <Flex
          // width={["100%", "100%", "50%", "50%"]}
          width="100%"
          maxW="700px"
          height="inherit"
          justifyContent="stretch"
          direction="column"
          alignItems="center"
          padding={["0px", "0px", "0px", "0px"]}
          color="grey.greyStone"
        >
          <Text
            fontSize="33px"
            fontWeight="bold"
            textShadow="3px 2px #ccc"
            color="black"
          >
            Nosso time-<em>desu</em>!
          </Text>
          <Flex
            width="100%"
            align="center"
            paddingY="10px"
            justifyContent="center"
            gap="10"
          >
            <Flex
              align="center"
              flexDirection="column"
              backgroundColor="gold.sand20"
              borderRadius="8px"
              border="2px solid #D3A16F"
              padding="20px"
            >
              <Text
                fontSize="25px"
                fontWeight="bold"
                textShadow="3px 2px #ccc"
                color="black"
              >
                Frontend
              </Text>
              <Flex width="100%" align="center" paddingY="10px">
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
                  maxH="35px"
                  maxW="35px"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/fern%C3%A3o-shiotsuki-49497a203/"
                    )
                  }
                  src={ln}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>
              <Flex width="100%" align="center" paddingY="10px">
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
                  maxH="35px"
                  maxW="35px"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/marcos-vinicius-071510220/"
                    )
                  }
                  src={ln}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>

              <Flex width="100%" align="center" paddingY="10px">
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
                  maxH="35px"
                  maxW="35px"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/cristian-tacca-837522182/"
                    )
                  }
                  src={ln}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>

              <Flex width="100%" align="center" paddingY="10px">
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
                  maxH="35px"
                  maxW="35px"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/rbsndev3/"
                    )
                  }
                  src={ln}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>

              <Flex width="100%" align="center" paddingY="10px">
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
                  maxH="35px"
                  maxW="35px"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/gabriel-amaral-59181b218/"
                    )
                  }
                  src={ln}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>
            </Flex>
            <Flex
              align="center"
              flexDirection="column"
              backgroundColor="gold.sand20"
              borderRadius="8px"
              border="2px solid #D3A16F"
              padding="30px"
            >
              <Text
                fontSize="25px"
                fontWeight="bold"
                textShadow="3px 2px #ccc"
                color="black"
              >
                Backend
              </Text>
              <Flex width="100%" align="center" paddingY="10px">
                <Text
                  marginTop="5px"
                  fontSize="20px"
                  width="100%"
                  textAlign="center"
                  fontWeight="700"
                >
                  Bernardo Costa - PO
                </Text>
                <Img
                  maxH="35px"
                  maxW="35px"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/bernardo-c-costa/"
                    )
                  }
                  src={ln}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>
              <Flex width="100%" align="center" paddingY="10px">
                <Text
                  marginTop="5px"
                  fontSize="20px"
                  width="100%"
                  textAlign="center"
                  fontWeight="700"
                >
                  Bruno Tetzner - TL
                </Text>
                <Img
                  maxH="35px"
                  maxW="35px"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/bruno-tetzner/"
                    )
                  }
                  src={ln}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>

              <Flex width="100%" align="center" paddingY="10px">
                <Text
                  marginTop="5px"
                  fontSize="20px"
                  width="100%"
                  textAlign="center"
                  fontWeight="700"
                >
                  Gustavo Oliveira - SM
                </Text>
                <Img
                  maxH="35px"
                  maxW="35px"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/cristian-tacca-837522182/"
                    )
                  }
                  src={ln}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>

              <Flex width="100%" align="center" paddingY="10px">
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
                  maxH="35px"
                  maxW="35px"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/gabrieldsamaral/"
                    )
                  }
                  src={ln}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>

              <Flex width="100%" align="center" paddingY="10px">
                <Text
                  marginTop="5px"
                  fontSize="20px"
                  width="100%"
                  textAlign="center"
                  fontWeight="700"
                >
                  Paulo José - QA
                </Text>
                <Img
                  maxH="35px"
                  maxW="35px"
                  onClick={() =>
                    window.location.replace(
                      "https://www.linkedin.com/in/paulojoseoliveira/"
                    )
                  }
                  src={ln}
                  _hover={{ cursor: "pointer" }}
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  );
};
