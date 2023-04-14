import { memo, useState } from "react";

import TextareaAutosize from "react-textarea-autosize";
import { Lightning } from "@phosphor-icons/react";
import { useChatContext } from "@/context/ChatContext";

function PromptInput() {
  const [prompt, setPrompt] = useState("");

  const { handleSendMessage } = useChatContext();

  return (
    <form className="max-w-[650px] z-20 px-4 fixed bottom-6 left-1/2 -translate-x-1/2 w-full">
      <div className="flex bg-gray-200 dark:bg-zinc-800 rounded-md items-center">
        <TextareaAutosize
          onKeyDown={(e) => {
            const isMobile = window.innerWidth < 768;

            if (e.key === "Enter" && !isMobile) {
              e.preventDefault();
              handleSendMessage(prompt);
              setPrompt("");
            }
          }}
          placeholder="Enviar uma mensagem..."
          className="outline-none bg-transparent rounded-md w-full pl-2 py-2 resize-none text-sm"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />
        <button
          type="button"
          className="w-9 h-9 pr-1 flex justify-center items-center"
          onClick={() => {
            handleSendMessage(prompt);
            setPrompt("");
          }}
        >
          <Lightning size={18} className="dark:text-gray-400 text-gray-600" />
        </button>
      </div>
    </form>
  );
}

export default memo(PromptInput);
