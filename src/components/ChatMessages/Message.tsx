import Image from "next/image";
import MarkdownRenderer from "./MarkdownRenderer";
import { ChatAgent } from "@/context/ChatContext";
import classNames from "classnames";
import { memo } from "react";

interface IMessageProps {
  content: string;
  role: ChatAgent;
}

function Message({ content, role }: IMessageProps) {
  if (role === "system") return <></>;

  return (
    <div className={classNames("py-8 px-3 md:px-8", role === "user" ? "bg-gray-200 dark:bg-zinc-950" : "")}>
      <div className="max-w-[800px] mx-auto flex gap-4 md:gap-6 lg:gap-8 relative">
        <div className="h-full flex items-start">
          <div className="w-10 h-10 relative">
            <Image
              src={role === "user" ? "/user.gif" : "/chisato.jpg"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="User avatar"
              fill
              className="object-cover rounded-sm select-none"
            />
          </div>
        </div>

        <div className="flex justify-center flex-col w-[84%] text-sm md:text-base">
          <strong> {role === "user" ? "Usuário" : "Sabrina"} </strong>
          <MarkdownRenderer content={content} />
        </div>

        {/* <div className="absolute right-4 top-0"> ola</div> */}
      </div>
    </div>
  );
}

export default memo(Message);
