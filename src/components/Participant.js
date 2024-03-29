import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../contexts/AppContextProvider";
import Header from "./Header";
import { Box, Button, HStack, Stack, Text, useToast } from "@chakra-ui/react";
import { SocketContext } from "../contexts/socket";

function Participant() {
  const { state } = useContext(AppContext);
  const { name, email } = state;
  // const [questionValue, setQuestionValue] = useState("");
  // const [voteStatus, setVoteStatus] = useState(false);
  const socket = useContext(SocketContext);
  const [pollAnswer, setPollAnswer] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const toast = useToast();
  const [resultObject, setResultObject] = useState(null);

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      socket.emit("fetch-pre-created-question");
      setFirstRender(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!!email) {
      socket.on("new-question", (questionValue) => {
        if (!!questionValue) {
          setIsSubmitted(false);
          setPollQuestion(questionValue);
          setPollAnswer("");
        } else {
          setIsSubmitted(true);
          setPollQuestion("");
          setPollAnswer("");
        }
        setResultObject(null);
      });

      socket.on("fetch-pre-created-question", (questionValue) => {
        if (!!questionValue) {
          setIsSubmitted(false);
          setPollQuestion(questionValue);
        } else {
          setIsSubmitted(true);
          setPollQuestion("");
          setPollAnswer("");
        }
        setResultObject(null);
      });

      socket.on("last-vote-results", (resultObject) => {
        setResultObject(resultObject);
      });
    }
    // eslint-disable-next-line
  }, [email]);

  const submitSelectedPollOption = () => {
    if (pollAnswer === "") {
      toast({
        title: "Please choose either option",
        duration: 1500,
        status: "error",
      });
    }
    if (pollAnswer === "YES" || pollAnswer === "NO") {
      socket.emit("submit-selected-poll-option", {
        email: email,
        name: name,
        pollAnswer: pollAnswer,
        time: new Date(),
      });
      setIsSubmitted(true);
      toast({
        title: "Submitted Successfully",
        duration: 1500,
        status: "success",
      });
    }
  };

  return (
    <Box>
      <Header />
      {!isSubmitted && !!pollQuestion ? (
        <Box justifyContent={"center"} alignItems={"center"} mt="5">
          <Stack justifyContent={"center"} alignItems={"center"} px="3" pt="3">
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Resolution Proposed
            </Text>
            <Text fontSize={"lg"}>{pollQuestion}</Text>
          </Stack>

          <Box>
            <HStack justifyContent="center" alignItems="center" px="2" my="4">
              <Button
                bg={pollAnswer === "YES" ? "#ace123" : "#EEEEE"}
                variant="solid"
                borderRadius={0}
                minH="10"
                borderLeftRadius={6}
                minW="150px"
                fontSize={"sm"}
                onClick={() => {
                  setPollAnswer("YES");
                }}
                color="black"
                _hover={{ textDecor: "none" }}
                borderColor={"#707070"}
                borderWidth={"1px"}
              >
                YES
              </Button>
              <Button
                bg={pollAnswer === "NO" ? "#ace123" : "#EEEEEE"}
                color="black"
                variant="solid"
                minH="10"
                minW="150px"
                borderRadius={0}
                borderRightRadius={6}
                fontSize={"sm"}
                onClick={() => {
                  setPollAnswer("NO");
                }}
                _hover={{ textDecor: "none" }}
                borderColor={"#707070"}
                borderWidth={"1px"}
              >
                NO
              </Button>
            </HStack>
          </Box>

          <HStack justifyContent={"center"} alignItems={"center"} mt="4">
            <Button
              minW="150"
              justifyContent={"center"}
              alignItems={"center"}
              mx="4"
              my="4"
              bg="#e0e0e0"
              onClick={() => {
                submitSelectedPollOption();
              }}
            >
              Submit Response
            </Button>
          </HStack>
        </Box>
      ) : (
        <Box mt="20">
          <HStack justifyContent="center" alignItems="center" px="2" my="4">
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Please wait..
            </Text>
          </HStack>
          <HStack justifyContent="center" alignItems="center" px="2" my="4">
            <Text fontSize={"lg"} fontWeight={"bold"}>
              A resolution will be displayed soon!
            </Text>
          </HStack>
          {!!pollQuestion && (
            <HStack justifyContent={"center"} alignItems={"center"} mt="4">
              <Button
                minW="150"
                justifyContent={"center"}
                alignItems={"center"}
                mx="4"
                my="4"
                bg="#e0e0e0"
                onClick={() => {
                  setIsSubmitted(false);
                }}
              >
                Go Back To Change Response?
              </Button>
            </HStack>
          )}
          {!pollQuestion && !!resultObject && (
            <Box
              justifyContent={"center"}
              alignItems={"center"}
              mt="10"
              bg="#ecf0f1"
            >
              <Stack
                justifyContent={"center"}
                alignItems={"center"}
                px="3"
                pt="3"
              >
                <Text fontSize={"lg"} fontWeight={"bold"}>
                  Last Resolution Result:
                </Text>
                <Text fontSize={"lg"}>{resultObject.question}</Text>
              </Stack>
              <Box mt="4">
                <Box borderBottomWidth={"2px"} pb="3">
                  <HStack justifyContent="center" alignItems="center" px="2">
                    <Button
                      // bg={"#e0e0e0"}
                      variant="solid"
                      borderRadius={10}
                      minH="10"
                      minW="150px"
                      fontSize={"sm"}
                      color="black"
                      _hover={{ textDecor: "none" }}
                      // borderColor={"rgba(66, 153, 225, 0.6)"}
                      borderColor={"#707070"}
                      borderWidth={"3px"}
                      colorScheme="whiteAlpha"
                    >
                      YES {`(${resultObject.yesCount})`}
                    </Button>
                    <Button
                      // bg={"#e0e0e0"}
                      color="black"
                      variant="solid"
                      minH="10"
                      minW="150px"
                      borderRadius={10}
                      fontSize={"sm"}
                      _hover={{ textDecor: "none" }}
                      // borderColor={"rgba(66, 153, 225, 0.6)"}
                      borderColor={"#707070"}
                      borderWidth={"3px"}
                      colorScheme="whiteAlpha"
                    >
                      NO {`(${resultObject.noCount})`}
                    </Button>
                  </HStack>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Participant;
