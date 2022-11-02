import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../Context/ChatProvider';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import axios from 'axios';
import UserList from './UserList';
const SideDrawer = () => {
     const [search, setSearch] = useState("");
     const [searchResult, setSearchResult] = useState([]);
     const [loading, setLoading] = useState(false);
     const [loadingChat, setLoadingChat] = useState(false);
  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nevigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
   nevigate("/");
  };

  const handleSearch = async () => {
     if (!search) {
       toast({
         title: "Please Enter something in search",
         status: "warning",
         duration: 3000,
         isClosable: true,
         position: "top-left",
       });
       return;
     }
     try {
       setLoading(true);

       const config = {
         headers: {
           Authorization: `Bearer ${user.token}`,
         },
       };

       const { data } = await axios.get(
         `http://localhost:8080/user?search=${search}`,
         config
       );
       console.log(data)
       setLoading(false);
       setSearchResult(data);
     } catch (error) {
       toast({
         title: "Error Occured!",
         description: "Failed to Load the Search Results",
         status: "error",
         duration: 3000,
         isClosable: true,
         position: "bottom-left",
       });
     }
  };

  const accessChat =(userId)=>{

  }

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans">
          True Chat
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <Button onClick={logoutHandler}>Logout</Button>
            {/* <MenuList></MenuList> */}
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        {/* <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Users</DrawerHeader>
        </DrawerContent>
        <DrawerBody></DrawerBody> */}
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box  display={"flex"} pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading?"":(searchResult?.map((user)=>(
                    <UserList key={user._id}
                    user={user}
                    handleFunction ={()=>accessChat(user._id)}
                    />
        )))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer