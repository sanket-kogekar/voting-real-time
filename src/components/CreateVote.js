// import Landing from "./Landing";
import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../contexts/socket";
import Header from "./Header";
import format from "date-fns/format";
import isDate from "date-fns/isDate";
import { AppContext } from "../contexts/AppContextProvider";
import UseEmail from "./UseEmail";

export function formatDate(dateString) {
  const date = new Date(dateString);
  if (!isDate(date)) return;
  return format(date, "MM/dd/yyyy hh:mm:ss");
}

function CreateVote() {
  // Global state & actions
  const [questionValue, setQuestionValue] = useState("");
  const [voteStatus, setVoteStatus] = useState(false);
  const toast = useToast();
  const socket = useContext(SocketContext);
  const { state } = useContext(AppContext);
  const { email } = state;

  const [lastQuestionResult, setLastQuestionResult] = useState(null);

  // const [yesResultCount, setYesResultCount] = useState(0);
  // const [noResultCount, setNoResultCount] = useState(0);
  const [resultList, setResultList] = useState([]);
  const {
    //loading, submitted, error,
    sendEmail,
  } = UseEmail(
    "https://public.herotofu.com/v1/fb5a3d70-89d4-11ec-9849-fb4467695b96"
  );

  const incrementCount = (value) => {
    if (value === "YES") {
      // UNCOMMENT THIS BELOW
      // setYesResultCount((prevCount) => prevCount + 1);
    } else {
      // UNCOMMENT THIS BELOW
      // setNoResultCount((prevCount) => prevCount + 1);
    }
  };

  const setList = (
    //updatedList
    pollAnswerDetails
  ) => {
    // setResultList(updatedList)
    let updatedList = [pollAnswerDetails];
    setResultList((prevState) => [...updatedList, ...prevState]);
  };

  // const getList = () => {
  //   const m = resultList.map((item) => item);
  //   return m;
  // };
  // console.log("resultList", resultList);
  // const anotherFunction = () => {};

  const handlePollAnswer = (pollAnswerDetails) => {
    // console.log("handlePollAnswer pollAnswerDetails", pollAnswerDetails);
    // console.log("handlePollAnswer yesResultCount", yesResultCount);

    // const votedObjectInArray = resultList.filter((item) => {
    //   return item.email === pollAnswerDetails.email;
    // });
    // console.log("resultList", resultList);
    // const obj = anotherFunction();
    // if (votedObjectInArray.length === 0) {
    // let updatedList = [];
    // updatedList.push(pollAnswerDetails);
    // Array.prototype.push.apply(updatedList, resultList);

    // let updatedList = [...resultList];
    // updatedList.unshift(pollAnswerDetails);
    if (pollAnswerDetails.pollAnswer === "YES") {
      incrementCount("YES");
    } else {
      incrementCount("NO");
    }
    setList(pollAnswerDetails);
    // resList = updatedList;
    // }
  };

  useEffect(() => {
    socket.on("poll-selection", (pollAnswerDetails) => {
      handlePollAnswer(pollAnswerDetails);
    });
    // eslint-disable-next-line
  }, []);

  const endVoting = () => {
    let voteResult = {
      question: questionValue,
      yesCount: getCount(resultList, "YES"),
      noCount: getCount(resultList, "NO"),
      logs: resultList,
    };
    setLastQuestionResult(voteResult);
    sendEmail({ ...voteResult, logs: JSON.stringify(voteResult.logs) });
    setVoteStatus(false);
    setQuestionValue("");
    socket.emit("start-voting", { question: "", email: email });
    // sending result
    socket.emit("share-result", {
      question: voteResult.question,
      yesCount: voteResult.yesCount,
      noCount: voteResult.noCount,
    });
    // UNCOMMENT THIS BELOW
    // setYesResultCount(0);
    // setNoResultCount(0);
    setResultList([]);
    // resList = [];
  };

  const submitQuestion = () => {
    if (!!questionValue) {
      socket.emit("start-voting", { question: questionValue, email: email });
      setVoteStatus(true);
      // UNCOMMENT THIS BELOW
      // setYesResultCount(0);
      // setNoResultCount(0);
      setResultList([]);
      setLastQuestionResult(null);
      // resList = [];
    } else {
      toast({
        title: "Please enter the resolution",
        duration: 1500,
        status: "error",
      });
    }
  };

  const removeDuplicatesFromList = (list) => {
    if (list.length === 0) {
      return [];
    } else {
      const seen = new Set();

      const filteredArr = list.filter((el) => {
        const duplicate = seen.has(el.email);
        seen.add(el.email);
        return !duplicate;
      });

      return filteredArr;
    }
  };

  const getCount = (list, value) => {
    if (list.length === 0) {
      return 0;
    } else {
      const seen = new Set();

      const filteredArr = list.filter((el) => {
        const duplicate = seen.has(el.email);
        seen.add(el.email);
        return !duplicate;
      });

      if (value === "YES") {
        const yesArray = filteredArr.filter((item) => {
          return item.pollAnswer === "YES";
        });
        return yesArray.length;
      } else {
        const noArray = filteredArr.filter((item) => {
          return item.pollAnswer === "NO";
        });
        return noArray.length;
      }
    }
  };

  return (
    <Box>
      <Header />
      {!voteStatus ? (
        <>
          <Box justifyContent={"center"} alignItems={"center"} mt="8">
            <Textarea
              variant="outline"
              placeholder="Please enter the resolution"
              value={questionValue}
              onChange={(e) => {
                setQuestionValue(e.target.value);
              }}
              px="4"
              py="4"
            />
            <HStack justifyContent={"center"} alignItems={"center"}>
              <Button
                minW="150"
                justifyContent={"center"}
                alignItems={"center"}
                mx="4"
                my="4"
                align
                onClick={() => submitQuestion()}
                bg="#e0e0e0"
              >
                Start Voting
              </Button>
            </HStack>
          </Box>
          {!!lastQuestionResult && (
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
                <Text fontSize={"lg"}>{lastQuestionResult.question}</Text>
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
                      YES {`(${lastQuestionResult.yesCount})`}
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
                      NO {`(${lastQuestionResult.noCount})`}
                    </Button>
                  </HStack>
                </Box>
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Box justifyContent={"center"} alignItems={"center"} mt="5">
          <Stack justifyContent={"center"} alignItems={"center"} px="3" pt="3">
            <Text fontSize={"lg"} fontWeight={"bold"}>
              Resolution Proposed:
            </Text>
            <Text fontSize={"lg"}>{questionValue}</Text>
          </Stack>
          <HStack justifyContent={"center"} alignItems={"center"} mt="4">
            <Button
              minW="150"
              justifyContent={"center"}
              alignItems={"center"}
              mx="4"
              my="4"
              align
              onClick={() => {
                endVoting();
              }}
              bg="#e0e0e0"
            >
              End Voting
            </Button>
          </HStack>
          <Box bg="#ecf0f1">
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              px="3"
              py="3"
              borderTopWidth={"2px"}
              my="3"
            >
              <Text
                fontSize={"lg"}
                fontWeight={"bold"} //mt="2"
              >
                Live Result Count
              </Text>
            </Stack>

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
                  {/* YES {`(${yesResultCount})`} */}
                  YES {`(${getCount(resultList, "YES")})`}
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
                  {/* NO {`(${noResultCount})`} */}
                  NO {`(${getCount(resultList, "NO")})`}
                </Button>
              </HStack>
            </Box>
          </Box>
          {!!resultList && resultList.length > 0 && (
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              px="3"
              pt="1"
              pb="3"
              borderBottomWidth={"2px"}
            >
              <Text fontSize={"lg"} fontWeight={"bold"} mt="2" color="green">
                History
              </Text>
            </Stack>
          )}
          <Box overflow="auto" bg="#F8EFBA">
            {removeDuplicatesFromList(resultList).map((item) => {
              return (
                <Stack
                  spacing="1"
                  borderBottomWidth={"1px"}
                  borderColor={"#707070"}
                  py="3"
                >
                  {/* <HStack justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize={"14px"} fontWeight={600}>
                      {item.name} ({item.email})
                    </Text>
                  </HStack>
                  <HStack justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize={"14px"} fontWeight={600}>
                      voted {item.pollAnswer} on {formatDate(item.time)}
                    </Text>
                  </HStack> */}
                  <HStack justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize={"14px"} fontWeight={600}>
                      {item.email} voted {item.pollAnswer}
                    </Text>
                  </HStack>
                  <HStack justifyContent={"center"} alignItems={"center"}>
                    <Text fontSize={"14px"} fontWeight={600}>
                      on {formatDate(item.time)}
                    </Text>
                  </HStack>
                </Stack>
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CreateVote;
