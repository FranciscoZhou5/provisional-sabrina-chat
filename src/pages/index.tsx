import Head from "next/head";

import Header from "@/components/Header";
import ChatMessages from "@/components/ChatMessages";
import PromptInput from "@/components/PromptInput";

export default function Home() {
  return (
    <>
      <Head>
        <title>Sabrina</title>
        <meta name="description" content="Sabrina47, Inteligência Artificial de Japapaya" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* {showHeroSection && <div> Hero </div>} */}

        <ChatMessages />

        <PromptInput />
      </main>
    </>
  );
}
