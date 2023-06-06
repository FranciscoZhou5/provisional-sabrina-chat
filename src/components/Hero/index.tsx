import { useChatContext } from "@/context/ChatContext";
import { memo } from "react";

function Hero() {
  const { showHeroSection, handleSendMessage } = useChatContext();

  if (!showHeroSection) return <></>;

  return (
    <section className="max-w-[800px] mx-auto pt-8 px-4">
      <h2 className="font-bold text-2xl text-center">Sabrina</h2>

      <div className="py-4 text-center w-full">
        <span>Perguntas frequentes</span>

        <div className="w-full py-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[`"Quais aulas eu vou ter hoje?"`, `"É possível fazer um filho com maizena?"`, `"Eu sou um gato?"`].map((item) => (
            <button
              key={Math.random()}
              onClick={() => handleSendMessage(item.replaceAll(`"`, ""), "")}
              className="bg-gray-200 dark:bg-zinc-800 dark:hover:opacity-60 duration-200 h-16 px-3 py-2 rounded-md hover:bg-background-tertiary w-full text-sm"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
