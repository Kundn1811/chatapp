import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { getSender, getSenderObj } from "../config/chatLogic";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "./tools/ProfileModal";
import UpdateGroup from "./tools/UpdateGroup";
import "./authStyle.css"
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client"
const ENDPOINT = "https://peaceful-sierra-38069.herokuapp.com";
var socket,selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {

  const { user, selectedChat, setSelectedChat } = ChatState();
 const messageEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
 const [socketConnected,setSocketConnected] = useState(false)
  const toast = useToast()

  // Getting message
    const fetchMessages = async () => {
      if (!selectedChat) return;

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        setLoading(true);

        const { data } = await axios.get(
          `https://peaceful-sierra-38069.herokuapp.com/message/${selectedChat._id}`,
          config
        );
      
        setMessages(data);
        setLoading(false);

        socket.emit("join chat", selectedChat._id);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Messages",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    };
  // console.log("message",messages);

  // Message posting function
  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "https://peaceful-sierra-38069.herokuapp.com/message",
          { content: newMessage, chatId: selectedChat._id },
          config
        );

        // console.log("message",data);
        socket.emit("new message", data);
        setMessages([...messages,data])
      } catch (error) {
toast({
  title: "Error Occured!",
  description: "Unable to send message",
  status: "error",
  duration: 3000,
  isClosable: true,
  position: "bottom",
});
      }
    }
  };

useEffect(() => {
  socket = io(ENDPOINT);
  socket.emit("setup", user);
  socket.on("connected", () => setSocketConnected(true));
}, []);

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };


 
  useEffect(() => {
      fetchMessages()
      selectedChatCompare = selectedChat
  }, [selectedChat])
  
 useEffect(()=>{
  socket.on("message recieved",(newMessageRecieved)=>{
    if(!selectedChatCompare || selectedChatCompare._id !==newMessageRecieved.chat._id){
      // give notification
    }else{
      setMessages([...messages,newMessageRecieved])
    }
  });
 })

 useEffect(()=>{
    messageEndRef.current?.scrollIntoView();
 },[messages])
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderObj(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroup
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
                <div ref={messageEndRef} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant={"filled"}
                bg="#E0E0E0"
                placeholder="Start Communication"
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize={"2rem"} pb={3} fontFamily="Work sans">
            Click On The User To Start Chat
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
