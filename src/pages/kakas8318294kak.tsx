import Header from "@/components/Header";
import MarkdownRenderer from "@/components/ChatMessages/MarkdownRenderer";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, CaretLeft, CaretRight } from "@phosphor-icons/react";
import classNames from "classnames";
import { NextPageContext } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface IProps {
  prompts: {
    prompt: string;
    avatar: number;
    owner: string;
  }[];
  totalPages: number;
  currentPage: number;
}

function PromptsList({ prompts, totalPages, currentPage }: IProps) {
  const router = useRouter();

  // if (true) {
  //   return <></>;
  // }

  return (
    <>
      <Head>
        <title> Sabrina | Perguntas </title>
      </Head>

      <Header />

      <main>
        <div className="max-w-[1000px] mx-auto pt-4 px-4 flex">
          <Link href="/" className="group">
            <ArrowLeft size={24} className="group-hover:dark:hover:text-white group-hover:text-black duration-200" />
          </Link>
        </div>

        <div className="max-w-[800px] mx-auto py-4">
          <h2 className="text-center px-4 text-lg"> Aqui você pode ver o que a galera anda perguntando... </h2>

          {prompts?.map(({ prompt, avatar, owner }) => (
            <div key={Math.random()} className="my-6 md:my-8 px-3 md:px-8">
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
                  <strong> {owner} </strong>

                  <MarkdownRenderer content={prompt} />
                </div>
              </div>
            </div>
          ))}

          <div className="px-3 md:px-8 mb-4 w-full flex justify-between items-center">
            <button disabled={currentPage - 1 === 0} onClick={() => router.push(`/kakas8318294kak?page=${currentPage - 1}`)}>
              <CaretLeft size={24} className={classNames(currentPage - 1 === 0 ? "cursor-not-allowed" : "hover:text-white duration-200")} />
            </button>

            <div className="dark:text-gray-400 text-gray-600">
              <span className="dark:text-white text-gray-900">{currentPage}</span>
            </div>

            <button disabled={currentPage + 1 > totalPages} onClick={() => router.push(`/kakas8318294kak?page=${currentPage + 1}`)}>
              <CaretRight
                size={24}
                className={classNames(currentPage + 1 > totalPages ? "cursor-not-allowed" : "hover:text-white duration-200")}
              />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

interface Context extends NextPageContext {
  query: { page: string };
}

PromptsList.getInitialProps = async (ctx: Context) => {
  async function paginateAndReverseData(array: any[], itemsPerPage: number, currentPage: number) {
    const reversedArray = array.reverse();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedArray = reversedArray.slice(startIndex, endIndex);

    const totalPages = Math.ceil(reversedArray.length / itemsPerPage);

    return { totalPages, paginatedArray };
  }

  const page = +ctx.query.page || 1;
  const ITEMS_PER_PAGE = 10;

  const { data } = await supabase.from("prompts").select("*");

  if (!data || data.length === 0) {
    return {
      prompts: [],
      total: 0,
    };
  }

  const result = await paginateAndReverseData(data as any[], ITEMS_PER_PAGE, page);

  return {
    prompts: result.paginatedArray as { prompt: string; avatar: number; owner: string }[],
    totalPages: result.totalPages,
    currentPage: page,
  };
};

export default PromptsList;
