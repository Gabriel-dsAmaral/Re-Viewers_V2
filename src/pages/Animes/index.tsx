import { Text, useBreakpointValue, VStack } from '@chakra-ui/react'
import { Box, Flex, Img } from '@chakra-ui/react'
import { useAnime } from '../../Providers/AnimesProvider'
import { Button } from '../../components/Button'
import { Comments } from '../../components/Comments'
import { Header } from '../../components/Header'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { FixedAnimeCard } from "../../components/FixedAnimeModal";

export const AnimePage = () => {
  const { selectedAnime, getAnimeById } = useAnime()

  const { id } = useParams<{ id: string }>()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  useEffect(() => {
    getAnimeById(Number(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box width="100%" minH="100vh">
      <Header />

      {selectedAnime.category && (
        <>
          <Box
            background={`linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(${selectedAnime.banner_url})`}
            // background={`linear-gradient(rgba(211, 236, 226, 1), rgba(246, 236, 226, 0)),url(${selectedAnime.banner_url})`}
            backgroundSize="cover"
            backgroundPosition="center"
            height="330px"
            width="100%"
          />
          <Flex
            // marginLeft={["0px", "0px", "0px", "270px"]}
            flexDirection="column"
            alignItems={['center', 'center', 'center', 'start']}
            // border="2px solid"
            marginTop={['-150px', '-150px', '-150px', '0px']}
            marginLeft={['0px', '0px', '0px', '280px']}
          >
            {/* IMAGEM E BOTÕES */}
            <VStack
              // border="2px solid"
              direction="column"
              top="120px"
              left="20px"
              position={['static', 'static', 'static', 'fixed']}
            >
              <Img
                h="300px"
                w="230px"
                borderRadius="3px"
                src={selectedAnime.image_url}
              />

              {/* APAGAR-BOTÕES NO MOBILE */}
              {isWideVersion && (
                <VStack w="230px">
                  <Button w="inherit" model="1">
                    Assitindo
                  </Button>
                  <Button w="inherit" model="2">
                    Quero Assistir
                  </Button>
                  <Button w="inherit" model="3">
                    Terminei...):
                  </Button>
                  <Button w="inherit" model="4">
                    Avaliar
                  </Button>
                </VStack>
              )}
            </VStack>
            <Text
              fontWeight="600"
              fontSize="30px"
              // border="2px solid red"
              marginY="10px"
              textAlign="center"
            >
              {selectedAnime.title}
            </Text>
            <Flex
              flexFlow={['row wrap', 'row wrap', 'row wrap', 'row-reverse']}
              justifyContent="space-around"
              alignItems="baseline"
              width={['80%', '80%', '80%', 'auto']}
              // border="2px solid red"
            >
              <Box
                p="1"
                width={['100%', '100%', '100%', '180px']}
                display="inline-flex"
                justifyContent="center"
                alignItems="end"
              >
                <Text
                  border="solid 2px"
                  borderRadius="10px"
                  borderColor="secondary"
                  bgColor="#F6ECE1"
                  color="#8A5018"
                  fontSize="20px"
                  fontWeight="bold"
                  textAlign="center"
                  lineHeight="40px"
                  width="120px"
                  mb="10px"
                  textShadow="1px 1px #d6883f"
                >
                  Score: 6.89
                </Text>
              </Box>

              <Box
                width="100%"
                display="inline-flex"
                justifyContent="space-around"
                flexWrap="wrap"
                fontWeight="semibold"
                textShadow="0.5px 0.5px grey"
                // border="2px solid"
              >
                {selectedAnime.category.map((category, key) => {
                  return (
                    <Box
                      key={key}
                      border="solid 2px"
                      borderColor="secondary"
                      color="secondary"
                      borderRadius="10px"
                      bgColor="#F6ECE1"
                      width="120px"
                      textAlign="center"
                      marginTop="10px"
                      paddingY="3px"
                      boxShadow="base"
                    >
                      <p>{category}</p>
                    </Box>
                  )
                })}
              </Box>
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            <Text
              marginTop="10px"
              textAlign="center"
              fontSize="20px"
              color="gold.sand"
              fontWeight="bold"
              textShadow="1px 1px black"
            >
              Sinopse :
            </Text>
            <Text
              marginTop="10px"
              // border="2px solid purple"
              textAlign="justify"
              paddingX="20px"
              marginLeft={['0px', '0px', '0px', '260px']}
              marginRight={['0px', '0px', '0px']}
            >
              {selectedAnime.synopsis}
            </Text>

            <VStack
              border="2px solid"
              borderColor="secondary"
              alignItems="center"
              paddingY="20px"
              borderRadius="10px"
              bgColor="gold.light50"
              maxWidth={['100%', '100%', '100%', '280px']}
              minH="300px"
              alignSelf="end"
              marginX="20px"
              marginTop={['20px', '20px', '20px', '0px']}
              transform={['0px', '0px', '0px', 'translateY()']}
            >
              <Text
                textAlign="center"
                fontWeight="bold"
                fontSize="25px"
                color="primary"
                textShadow="0.5px 0.5px black"
              >
                Relacionados
              </Text>
              <Flex
                flexFlow="row wrap"
                justifyContent={[
                  'center',
                  'space-around',
                  'space-around',
                  'center'
                ]}
                alignItems={['center', 'center', 'center', 'center']}
                gap="20px"
                mt="30px"
                paddingInline="10px"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                  (item, key) => (
                    <Box
                      key={key}
                      border="2px solid"
                      borderColor="secondary"
                      bgColor="#F6ECE1"
                      color="#8A5018"
                      textAlign="center"
                      borderRadius="10px"
                      padding="5px"
                      _hover={{ cursor: 'pointer' }}
                      minW="100px"
                    >
                      Categoria
                    </Box>
                  )
                )}
              </Flex>
            </VStack>
            <Flex
              w="100%"
              display={['flex', 'flex', 'flex', 'none']}
              alignSelf="center"
              alignItems="center"
              justifyContent="space-around"
              flexFlow="row wrap"
              // border="2px solid"
              marginY="20px"
              paddingX="10px"
              gap="20px"
            >
              <Button minW="150px" h="40px" model="1">
                Assitindo
              </Button>
              <Button minW="150px" h="40px" model="2">
                Quero Assistir
              </Button>
              <Button minW="150px" h="40px" model="3">
                Terminei...):
              </Button>
              <Button minW="150px" h="40px" model="4">
                Avaliar
              </Button>
            </Flex>
          </Flex>
        </>
      )}
      <Comments />
    </Box>
  )
}
