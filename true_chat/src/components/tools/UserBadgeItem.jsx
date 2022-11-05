import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <Box
      paddingX={2}
      paddingY={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={"1.2rem"}
      backgroundColor="orange.300"
      color="purple.900"
      cursor="pointer"
      onClick={handleFunction}
    >
        {user.name}
        <CloseIcon fontSize={".6rem"} ml={2}/>
    </Box>
  );
};

export default UserBadgeItem;
