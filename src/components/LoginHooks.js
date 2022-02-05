import React, { useContext } from "react";
import { useGoogleLogin } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";
import { AppContext } from "../contexts/AppContextProvider";
import { Button } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

const clientId =
  "696312896075-n4cubnd439tgr9ol2o4a6r8m3d76s0q7.apps.googleusercontent.com";

function LoginHooks() {
  const { actions } = useContext(AppContext);
  const { setEmail, setName } = actions;

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    setEmail(res.profileObj.email);
    setName(res.profileObj.name);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    // alert(`Failed to login.`);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <Button
      leftIcon={<FaGoogle fontSize="1rem" />}
      onClick={signIn}
      bg="#fbc531"
      _hover={{ textDecor: "none" }}
    >
      Login with Google
    </Button>
  );
}

export default LoginHooks;
