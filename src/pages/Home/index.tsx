import { Box, Button } from "@chakra-ui/react";
import { CardLinks } from "../../components/CardLinks";
import { Header } from "../../components/Header";
import { useUser } from "../../Providers/UserProvider";
import { useAnime } from "../../Providers/AnimesProvider";
import { useComment } from "../../Providers/CommentsProvider";
import { useEffect } from "react";

export const Home = () => {
  const { signOut } = useUser();
  const { animes, getAnimes } = useAnime();
  const { MakeComment } = useComment();

  useEffect(() => {
    getAnimes();
  }, []);

  return (
    <Box minH="100vh" w="100%" backgroundColor="grey.80">
      <Header />
      <Button onClick={() => MakeComment(1, "jdiuowjdioajwd")}>edwdwdw</Button>

      <CardLinks title="Teste" animes={animes} />
      <Button onClick={signOut}>deslogar</Button>
    </Box>
  );
};
