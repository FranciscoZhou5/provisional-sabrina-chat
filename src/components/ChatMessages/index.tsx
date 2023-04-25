import React, { useMemo } from "react";
import { useChatContext } from "@/context/ChatContext";
import Message from "./Message";

function ChatMessages() {
  const { messages } = useChatContext();

  const memoizedMessages = useMemo(() => messages, [messages]);
  const userAvatar = useMemo(() => {
    return Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  }, []);

  return (
    <>
      {memoizedMessages.map(({ content, role }) => (
        <Message key={Math.random()} content={content} role={role} userAvatar={userAvatar} />
      ))}

      <div className="h-[50vh]"></div>
    </>
  );
}

export default React.memo(ChatMessages);
