import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { AnimeProvider } from "./AnimesProvider";
import { CommentProvider } from "./CommentsProvider";
import { UserProvider } from "./UserProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserProvider>
      <AnimeProvider>
        <CommentProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CommentProvider>
      </AnimeProvider>
    </UserProvider>
  );
};
