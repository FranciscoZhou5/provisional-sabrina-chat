import { memo } from "react";
import Image from "next/image";

import MarkdownRenderer from "./MarkdownRenderer";

import { ChatAgent, useChatContext } from "@/context/ChatContext";
import classNames from "classnames";

interface IMessageProps {
  content: string;
  role: ChatAgent;
}

function ChatMessages() {
  const { messages } = useChatContext();

  return (
    <>
      {messages.map(({ content, role }) => (
        <div className={classNames("py-8 px-3 md:px-8", role === "user" ? "bg-gray-300 dark:bg-zinc-950" : "")} key={Math.random()}>
          <div className="max-w-[800px] mx-auto flex gap-4 md:gap-6 lg:gap-8 relative">
            <div className="h-full flex items-start py-2">
              <div className="w-10 h-10 relative">
                <Image
                  src={role === "user" ? "/user.gif" : "/chisato.jpg"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="User avatar"
                  fill
                  className="object-cover rounded-sm"
                />
              </div>
            </div>

            <div className="flex justify-center flex-col w-[84%] text-sm md:text-base">
              <MarkdownRenderer content={content} />
            </div>

            {/* <div className="absolute right-4 top-0"> ola</div> */}
          </div>
        </div>
      ))}

      <div className="h-[50vh]"></div>
    </>
  );
}

export default memo(ChatMessages);
