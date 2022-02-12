import React, { useContext, useState } from "react";
// import { useGoogleLogin } from "react-google-login";
// refresh token
// import { refreshTokenSetup } from "../utils/refreshToken";
import { AppContext } from "../contexts/AppContextProvider";
import { Button, Input, Box, HStack, useToast } from "@chakra-ui/react";
// import { FaGoogle } from "react-icons/fa";

// const clientId =
//   "696312896075-n4cubnd439tgr9ol2o4a6r8m3d76s0q7.apps.googleusercontent.com";

const USERS = [
  {
    email: "Party1",
    password: "SS#P1",
  },
  {
    email: "Party2",
    password: "2022@P2",
  },
  {
    email: "Party3",
    password: "SS#P3",
  },
  {
    email: "Party4",
    password: "2022@P4",
  },
  {
    email: "Party5",
    password: "SS#P5",
  },
  {
    email: "Party6",
    password: "2022@P6",
  },
  {
    email: "Party7",
    password: "SS#P7",
  },
  {
    email: "Party8",
    password: "2022@P8",
  },
  {
    email: "Party9",
    password: "SS#P9",
  },
  {
    email: "Party10",
    password: "2022@P10",
  },
  {
    email: "Party11",
    password: "11SS#P",
  },
  {
    email: "Party12",
    password: "12@P2022",
  },
  {
    email: "Party13",
    password: "13SS#P",
  },
  {
    email: "Party14",
    password: "14@P2022",
  },
  {
    email: "Party15",
    password: "15SS#P",
  },
  {
    email: "Party16",
    password: "16@P2022",
  },
  {
    email: "Party17",
    password: "17SS#P",
  },
  {
    email: "Party18",
    password: "18@P2022",
  },
  {
    email: "Party19",
    password: "19SS#P",
  },
  {
    email: "Party20",
    password: "20@P2022",
  },
  {
    email: "Party21",
    password: "SS2022*21",
  },
  {
    email: "Party22",
    password: "22-SS2022",
  },
  {
    email: "Party23",
    password: "SS2022*23",
  },
  {
    email: "Party24",
    password: "24-SS202",
  },
  {
    email: "Party25",
    password: "SS2022*25",
  },
  {
    email: "Party26",
    password: "26-SS2022",
  },
  {
    email: "Party27",
    password: "SS2022*27",
  },
  {
    email: "Party28",
    password: "28-SS2022",
  },
  {
    email: "Admin",
    password: "SS2022#Admin",
  },
];

function LoginHooks() {
  const { actions } = useContext(AppContext);
  const { setEmail, setName } = actions;

  const [myEmail, setMyEmail] = useState("");
  const [myName, setMyName] = useState("");

  const toast = useToast();

  // const onSuccess = (res) => {
  //   console.log("Login Success: currentUser:", res.profileObj);
  //   setEmail(res.profileObj.email);
  //   setName(res.profileObj.name);
  //   refreshTokenSetup(res);
  // };

  const login = () => {
    const isLegit = USERS.filter(
      (item) =>
        myEmail.toLowerCase() === item.email.toLowerCase() &&
        myName === item.password
    );
    if (isLegit.length > 0) {
      setEmail(myEmail);
      setName(myName);
    } else {
      toast({
        title: "Incorrect Password!",
        duration: 1500,
        status: "error",
      });
    }
  };

  // const onFailure = (res) => {
  //   console.log("Login failed: res:", res);
  //   // alert(`Failed to login.`);
  // };

  // const { signIn } = useGoogleLogin({
  //   onSuccess,
  //   onFailure,
  //   clientId,
  //   isSignedIn: true,
  //   accessType: "offline",
  // });

  return (
    <Box>
      <Input
        variant="outline"
        placeholder="Login ID"
        value={myEmail}
        onChange={(e) => {
          setMyEmail(e.target.value);
        }}
        px="4"
        py="4"
        bg="white"
        my="2"
      />
      <Input
        variant="outline"
        my="2"
        placeholder="Password"
        value={myName}
        onChange={(e) => {
          setMyName(e.target.value);
        }}
        px="4"
        py="4"
        bg="white"
      />
      <HStack justifyContent={"center"} alignItem="center">
        <Button
          onClick={() => login()}
          bg="#fbc531"
          _hover={{ textDecor: "none" }}
          mt="2"
          minW="150"
        >
          Login
        </Button>
      </HStack>
    </Box>
  );
}

// return (
//     <Button
//       leftIcon={<FaGoogle fontSize="1rem" />}
//       onClick={signIn}
//       bg="#fbc531"
//       _hover={{ textDecor: "none" }}
//     >
//       Login with Google
//     </Button>
// )

export default LoginHooks;
