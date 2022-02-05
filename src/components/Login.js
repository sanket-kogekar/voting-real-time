import React from "react";

import { GoogleLogin } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "../utils/refreshToken";

const clientId =
  "696312896075-n4cubnd439tgr9ol2o4a6r8m3d76s0q7.apps.googleusercontent.com";

function Login() {
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    alert(`Logged in successfully welcome ${res.profileObj.name}!`);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login.`);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
