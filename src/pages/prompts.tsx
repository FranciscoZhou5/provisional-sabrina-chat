import Header from "@/components/Header";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { supabase } from "@/lib/supabase";
import { ArrowLeft } from "@phosphor-icons/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  prompts: { prompt: string; avatar: number }[];
}

function PromptsList({ prompts }: IProps) {
  return (
    <>
      <Head>
        <title> Sabrina | Perguntas </title>
      </Head>

      <Header />

      {/* <main>
        <div className="max-w-[1000px] mx-auto pt-4 px-4 flex">
          <Link href="/" className="group">
            <ArrowLeft size={24} className="group-hover:dark:hover:text-white group-hover:text-black duration-200" />
          </Link>
        </div>

        <div className="max-w-[800px] mx-auto py-4">
          <h2 className="text-center px-4 text-lg"> Aqui você pode ver o que a galera anda perguntando... </h2>

          {prompts?.map(({ prompt, avatar }) => (
            <div key={Math.random()} className="my-6 md:my-8 px-3 md:px-8 ">
              <div className=" py-4 px-4 md:px-6 lg:px-8 flex items-center rounded-md gap-4 md:gap-6 lg:gap-8 relative bg-gray-200 dark:bg-zinc-950">
                <div className="h-full flex items-start">
                  <div className="w-10 h-10 relative">
                    <Image
                      src={`/users/user-avatar-${avatar}.jpg`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt="User avatar"
                      fill
                      className="object-cover rounded-sm select-none"
                    />
                  </div>
                </div>

                <div className="flex justify-center flex-col w-[84%] text-sm md:text-base">
                  <strong> Usuário anônimo </strong>

                  <MarkdownRenderer content={prompt} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/",
      permanent: true,
    },
  };
};

// PromptsList.getInitialProps = async () => {
//   const { data } = await supabase.from("prompts").select("*");

//   return {
//     prompts: data?.reverse() as { prompt: string; avatar: number }[],
//   };
// };

export default PromptsList;

// export const getStaticProps = async () => {
//   const { data } = await supabase.from("prompts").select("*");

//   return {
//     props: {
//       prompts: data?.reverse() as { prompt: string; avatar: number }[],
//       revalidate: 5,
//     },
//   };
// };
