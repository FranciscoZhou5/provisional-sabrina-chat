import Header from "@/components/Header";
import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { FormEvent, useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (username.length === 0) {
      setError("Preencha o campo de nome");
      setTimeout(() => setError(""), 2000);

      return;
    }

    localStorage.setItem("auth@username", username);

    router.push("/");
  }

  function generateUsernamePlaceholder() {
    function getRandomNumber(max: number) {
      return Math.floor(Math.random() * (max + 1));
    }

    const firstNames = ["Gabriel", "Enzo", "Eduardo", "Arthur", "Bernardo"];
    const lastNames = ["Silva", "Menna", "Vieira", "Ortiz", "Zhou", "Rosa", "Barreto", "Mombach", "Fornazier"];

    const name = `${firstNames[getRandomNumber(firstNames.length - 1)]} ${lastNames[getRandomNumber(lastNames.length - 1)]}`;

    return name;
  }

  return (
    <>
      <Head>
        <title> Login </title>
      </Head>

      <Header />

      <div className="w-full h-screen flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="relative flex flex-col bg-gray-200 dark:bg-zinc-800 rounded-md p-3">
            <div className="flex flex-col">
              <label htmlFor="username" className="pb-1">
                Seu nome
              </label>
              <input
                id="username"
                type="text"
                name="username"
                className={classNames(
                  "bg-transparent rounded-md p-2 text-sm outline-none duration-200 border border-zinc-400 dark:border-zinc-700 focus:ring-2 focus:ring-purple-600",
                  error ? "ring dark:focus:ring-red-600 ring-red-500" : ""
                )}
                placeholder={generateUsernamePlaceholder()}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className="text-xs text-red-500 h-6 py-1">{error}</span>
            </div>
            <button className="rounded-md bg-purple-700  p-2 text-sm hover:bg-purple-800 duration-200 text-white"> Entrar </button>
          </div>
        </form>
      </div>
    </>
  );
}
