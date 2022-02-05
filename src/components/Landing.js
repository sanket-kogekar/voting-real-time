import { Flex, Box, HStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import LoginHooks from "./LoginHooks";

function Landing() {
  // Global state & actions
  // const { clientId } = state;
  // const { setClientId, setConnectionId, setFailureMessage, setChatRoom } =
  //   actions;

  // Socket functions in useEffect
  useEffect(() => {
    // Receive unique Id to connect with others
    // socket.on("client-id-from-server", (id) => {
    //   setClientId(id);
    // });
    // // Clients tries connecting with a client
    // socket.on("connection-details", (connectionDetails) => {
    //   if (connectionDetails.status) {
    //     setConnectionId(connectionDetails.connectionId);
    //     setChatRoom(connectionDetails.chatRoom);
    //   } else {
    //     setFailureMessage(connectionDetails.message);
    //   }
    // });
    // // Somebody connects with the client
    // socket.on("somebody-connected-with-you", (connectionDetails) => {
    //   if (connectionDetails.status) {
    //     setConnectionId(connectionDetails.connectionId);
    //     setChatRoom(connectionDetails.chatRoom);
    //   }
    // });
  }, []);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      py="5"
      px="5"
      bg="#ecf0f1"
      overflow={"auto"}
    >
      <Box>
        <HStack mt="10" justifyContent={"center"} alignItems={"center"}>
          <Text fontWeight={"bold"} fontSize={"30"}>
            Welcome to
          </Text>
        </HStack>
        <HStack mt="2" justifyContent={"center"} alignItems={"center"}>
          <Text color="green" fontSize={"40"} fontWeight={"bold"}>
            Easy Voting!
          </Text>
        </HStack>
        <HStack
          mt="50px"
          mb="20"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <LoginHooks />
        </HStack>
      </Box>
    </Flex>
  );
}

export default Landing;
