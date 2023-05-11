import { useChatContext } from "@/context/ChatContext";
import useSpeech from "@/hook/useSpeech";
import { memo } from "react";

function Hero() {
  const { showHeroSection } = useChatContext();

  if (!showHeroSection) return <></>;

  return (
    <section className="max-w-[800px] mx-auto pt-8 px-4">
      <h2 className="font-bold text-2xl text-center">Olá, sou a Sabrina! Em que posso ajudar?</h2>
    </section>
  );
}

export default memo(Hero);
