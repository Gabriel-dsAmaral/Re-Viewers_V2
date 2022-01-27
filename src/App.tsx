import { Routes } from "./routes";
import { useUser } from "./Providers/UserProvider";
import { Button } from "@chakra-ui/react";
import { AnimePage } from "./pages/Animes";

export const App = () => {
  return (
    <>
      <Routes />
    </>
  );
};
