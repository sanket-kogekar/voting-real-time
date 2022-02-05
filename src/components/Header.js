import { AppContext } from "../contexts/AppContextProvider";
// import Landing from "./Landing";
import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import LogoutHooks from "./LogoutHooks";

function Header() {
  // Global state & actions
  const { state } = useContext(AppContext);
  const { name } = state;

  return (
    <Box>
      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        px="3"
        pt="2"
        spacing={"3"}
      >
        <Text fontSize={"20"}>Welcome{!!name ? `, ${name}` : ""}!</Text>
        <LogoutHooks />
      </HStack>
    </Box>
  );
}

export default Header;
