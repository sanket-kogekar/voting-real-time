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
    email: "SS1",
    password: "S1#2023",
  },
  {
    email: "SS2",
    password: "SS2*2023",
  },
  {
    email: "SS3",
    password: "S3$2023",
  },
  {
    email: "SS4",
    password: "SS4&2023",
  },
  {
    email: "SS5",
    password: "S5#2023",
  },
  {
    email: "SS6",
    password: "SS6*2023",
  },
  {
    email: "SS7",
    password: "S7$2023",
  },
  {
    email: "SS8",
    password: "SS8&2023",
  },
  {
    email: "SS9",
    password: "2023#S9",
  },
  {
    email: "SS10",
    password: "2023*SS10",
  },
  {
    email: "SS11",
    password: "2023$S11",
  },
  {
    email: "SS12",
    password: "2023&SS12",
  },
  {
    email: "SS13",
    password: "2023#S13",
  },
  {
    email: "SS14",
    password: "2023*SS14",
  },
  {
    email: "SS15",
    password: "2023$S15",
  },
  {
    email: "SS16",
    password: "2023&SS16",
  },
  {
    email: "SS17",
    password: "S17#2023",
  },
  {
    email: "SS18",
    password: "SS18*2023",
  },
  {
    email: "SS19",
    password: "S19$2023",
  },
  {
    email: "SS20",
    password: "SS20&2023",
  },
  {
    email: "SS21",
    password: "S21#2023",
  },
  {
    email: "SS22",
    password: "SS22*2023",
  },
  {
    email: "SS23",
    password: "S23$2023",
  },
  {
    email: "SS24",
    password: "SS24&2023",
  },
  {
    email: "Admin",
    password: "SS2023#Admin",
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
        borderColor={"#92a8d1"}
      />
      <Input
        variant="outline"
        my="2"
        placeholder="Password"
        value={myName}
        onChange={(e) => {
          setMyName(e.target.value);
        }}
        borderColor={"#92a8d1"}
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
