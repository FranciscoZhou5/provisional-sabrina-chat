import { useChatContext } from "@/context/ChatContext";
import Message from "./Message";

export default function ChatMessages() {
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
