import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import Landing from "./Landing";
import CreateVote from "./CreateVote";
import Participant from "./Participant";
import { Box } from "@chakra-ui/react";
import { SocketContext, socket } from "../contexts/socket";

function SiteContainer() {
  const { state } = useContext(AppContext);
  const { email } = state;

  // const adminEmail = "cjco.chinmay@gmail.com";
  const adminEmail = "Admin";

  // if (!email) {
  //   return <Landing />;
  // } else if (email === adminEmail) {
  //   return <CreateVote />;
  // } else if (!!email && email !== adminEmail) {
  //   return <Participant />;
  // }

  return (
    <Box>
      {!email && <Landing />}
      <SocketContext.Provider value={socket}>
        {email.toLowerCase() === adminEmail.toLowerCase() && <CreateVote />}
        {!!email && email !== adminEmail && <Participant />}
      </SocketContext.Provider>
    </Box>
  );
}

export default SiteContainer;
