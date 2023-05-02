import Head from "next/head";

import Header from "@/components/Header";
import ChatMessages from "@/components/ChatMessages";
import PromptInput from "@/components/PromptInput";
import Hero from "@/components/Hero";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

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
        <Hero />

        <ChatMessages />

        <PromptInput />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { username } = parseCookies(ctx);

  if (!username) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
