import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "696312896075-n4cubnd439tgr9ol2o4a6r8m3d76s0q7.apps.googleusercontent.com";

function Logout() {
  const onSuccess = () => {
    console.log("Logout made successfully");
    // alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
