import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { UserProvider } from "./UserProvider";
import { CommentProvider } from "./CommentsProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserProvider>
      <CommentProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CommentProvider>
    </UserProvider>
  );
};
