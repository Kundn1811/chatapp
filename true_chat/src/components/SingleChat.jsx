import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { getSender, getSenderObj } from '../config/chatLogic'
import { ChatState } from '../Context/ChatProvider'
import ProfileModal from './tools/ProfileModal'
import UpdateGroup from './tools/UpdateGroup'

const SingleChat = ({fetchAgain,setFetchAgain}) => {
   const {user,selectedChat,setSelectedChat} = ChatState()
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
                <UpdateGroup fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
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
          ></Box>
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
}

export default SingleChat