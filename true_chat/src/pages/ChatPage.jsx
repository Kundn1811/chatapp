import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import './pagesStyle.css'
const ChatPage = () => {
  const { user } = ChatState();
   const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div className="chatContainer">
      {user && <SideDrawer />}

      <Box
        display={"flex"}
        justifyContent="space-between"
        padding={"1rem"}
        h="91.5vh"
        w="100%"
      >
        {user && (
          <MyChats fetchAgain={fetchAgain}/>
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
