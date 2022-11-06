import { Avatar, Tooltip } from "@chakra-ui/react";
import React, { useRef, useEffect } from "react";
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from "../config/chatLogic";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  
  return (
    <>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {isSameSender(messages, m, i, user._id) ||
              (isLastMessage(messages, i, user._id) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt={"7px"}
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.image}
                  />
                </Tooltip>
              ))}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#3cb54b" : "#5184e6"
                }`,
                color:"white",
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </>
  );
};

export default ScrollableChat;
