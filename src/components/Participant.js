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

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      socket.emit("fetch-pre-created-question");
      console.log("My fetch-question ran!");
      setFirstRender(false);
    }
  }, []);

  useEffect(() => {
    if (!!email) {
      socket.on("new-question", (questionValue) => {
        console.log("My questionValue", questionValue);
        if (!!questionValue) {
          setIsSubmitted(false);
          setPollQuestion(questionValue);
          setPollAnswer("");
        } else {
          setIsSubmitted(true);
          setPollQuestion("");
          setPollAnswer("");
        }
      });

      socket.on("fetch-pre-created-question", (questionValue) => {
        console.log(
          "My fetch-pre-created-question questionValue",
          questionValue
        );
        if (!!questionValue) {
          setIsSubmitted(false);
          setPollQuestion(questionValue);
        } else {
          setIsSubmitted(true);
          setPollQuestion("");
          setPollAnswer("");
        }
      });
    }
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
              Question
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
              A question will be displayed soon!
            </Text>
          </HStack>
        </Box>
      )}
    </Box>
  );
}

export default Participant;
