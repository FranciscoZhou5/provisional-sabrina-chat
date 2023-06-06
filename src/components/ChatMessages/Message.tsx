import Image from "next/image";
import { ChatAgent } from "@/context/ChatContext";
import classNames from "classnames";
import { memo, useMemo, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

import * as Popover from "@radix-ui/react-popover";
import { Copy, SpeakerHigh } from "@phosphor-icons/react";
import { copyToClipboard } from "@/utils/copyToClipboard";

interface IMessageProps {
  content: string;
  role: ChatAgent;
  userAvatar: number;
}

function Message({ content, role, userAvatar }: IMessageProps) {
  const [open, setOpen] = useState(false);

  if (role === "system") return <></>;

  return (
    <div className={classNames("py-8 px-3 group md:px-8", role === "user" ? "bg-gray-200 dark:bg-zinc-950" : "")}>
      <div className="max-w-[800px] mx-auto flex gap-4 md:gap-6 lg:gap-8 relative">
        <div className="h-full flex items-start">
          <div className="w-10 h-10 relative">
            <Image
              src={role === "user" ? `/users/user-avatar-${userAvatar}.jpg` : "/chisato.jpg"}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="User avatar"
              fill
              className="object-cover rounded-sm select-none"
            />
          </div>
        </div>

        <div className="flex justify-between items-start flex-row w-[84%] text-sm md:text-base">
          <MarkdownRenderer content={content} />
        </div>

        <div className="space-y-1">
          <Popover.Root open={open}>
            <Popover.Trigger asChild>
              <button
                onClick={async () => {
                  await copyToClipboard(content);

                  setOpen(true);

                  setTimeout(() => {
                    setOpen(false);
                  }, 1000);
                }}
                className="opacity-0 group-hover:opacity-100 text-weak hover:text-normal duration-200 pl-1"
              >
                <Copy size={18} />
              </button>
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content side="top" align="center" className="bg-green-600 px-2 py-1 rounded-md">
                <Popover.Arrow fill="rgb(22 163 74)" />

                <span className="text-white text-sm">Copiado</span>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <button
            // onClick={() => speak(content)}
            className="opacity-0 group-hover:opacity-100 text-weak hover:text-normal duration-200 pl-1"
          >
            <SpeakerHigh size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(Message);
