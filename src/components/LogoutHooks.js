import { Button } from "@chakra-ui/react";
import React, { useContext } from "react";
// import { useGoogleLogout } from "react-google-login";
import { AppContext } from "../contexts/AppContextProvider";

// const clientId =
//   "696312896075-n4cubnd439tgr9ol2o4a6r8m3d76s0q7.apps.googleusercontent.com";

function LogoutHooks() {
  const { actions } = useContext(AppContext);
  const { setEmail, setName } = actions;

  // const onLogoutSuccess = (res) => {
  //   console.log("Logged out Success");
  //   setEmail("");
  //   setName("");
  // };

  // const onFailure = () => {
  //   console.log(
  //     "Failed to logout. Please clear browser data and revisit the site."
  //   );
  // };

  // const { signOut } = useGoogleLogout({
  //   clientId,
  //   onLogoutSuccess,
  //   onFailure,
  // });

  const logout = () => {
    setEmail("");
    setName("");
  };

  // return (
  //   <Button bg="#e0e0e0" onClick={signOut}>
  //     Logout
  //   </Button>
  // );

  return (
    <Button bg="#e0e0e0" onClick={logout}>
      Logout
    </Button>
  );
}

export default LogoutHooks;
