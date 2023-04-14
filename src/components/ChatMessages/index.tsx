import React from 'react';
import { useChatContext } from "@/context/ChatContext";
import Message from "./Message";

function ChatMessages() {
  const { messages } = useChatContext();

  return (
    <>
      {messages.map(({ content, role }) => (
        <Message key={Math.random()} content={content} role={role} />
      ))}

      <div className="h-[50vh]"></div>
    </>
  );
}

export default React.memo(ChatMessages);
