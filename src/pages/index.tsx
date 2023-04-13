import Header from "@/components/Header";
import TextareaAutosize from "react-textarea-autosize";
import { Divide, Lightning } from "@phosphor-icons/react";

import Head from "next/head";
import { useState } from "react";
import { useChatContext } from "@/context/ChatContext";
import ChatMessages from "@/components/ChatMessages";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  const { handleSendMessage, showHeroSection } = useChatContext();

  return (
    <>
      <Head>
        <title>Sabrina</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* {showHeroSection && <div> Hero </div>} */}

        <ChatMessages />

        <form className="max-w-[650px] z-20 px-4 fixed bottom-6 left-1/2 -translate-x-1/2 w-full">
          <div className="flex bg-gray-200 dark:bg-zinc-800 rounded-md items-center">
            <TextareaAutosize
              onKeyDown={(e) => {
                const isMobile = window.innerWidth < 1024;

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
      </main>
    </>
  );
}
