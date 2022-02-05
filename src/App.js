import React from "react";
// import LoginHooks from './components/LoginHooks';
// import LogoutHooks from './components/LogoutHooks';
import "./App.css";
import AppContextProvider from "./contexts/AppContextProvider";
// import { SocketContext, socket } from "./contexts/socket";
import SiteContainer from "./components/SiteContainer";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    // <SocketContext.Provider value={socket}>
    <ChakraProvider>
      <AppContextProvider>
        <SiteContainer />
      </AppContextProvider>
    </ChakraProvider>
    // </SocketContext.Provider>
  );
  // return (
  //   <div className="App">
  //     <h2>Welcome to Easy Voting!</h2>
  //     <LoginHooks />
  //     {/* <LogoutHooks /> */}
  //   </div>
  // );
}

export default App;
