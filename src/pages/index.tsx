import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

import Header from "@/components/Header";
import ChatMessages from "@/components/ChatMessages";
import PromptInput from "@/components/PromptInput";
import Hero from "@/components/Hero";
import { GetServerSideProps } from "next";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // const username = localStorage.getItem("auth@username");
    // if (!username) {
    //   router.push("/login");
    // }
    // router.push("https://alycia.vercel.app/");
  }, [router]);

  return (
    <>
      <Head>
        <title>Sabrina</title>
        <meta name="description" content="Sabrina47, Inteligência Artificial de Japapaya" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      {/* <Header /> */}

      <main>
        <Hero />

        <ChatMessages />

        <PromptInput />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "https://alycia.vercel.app",
      permanent: false,
    },
  };
};
