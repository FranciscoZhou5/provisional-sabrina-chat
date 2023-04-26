import useTheme from "@/hook/useTheme";
import { Sun, Moon, ChartBar, ChatCircle } from "@phosphor-icons/react";
import Link from "next/link";

export default function Header() {
  const { toggleTheme, theme } = useTheme();

  const ToggleThemeIcon = theme === "light" ? Sun : Moon;

  return (
    <header className="h-12 flex justify-between items-center px-4 md:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800">
      <Link href="/">
        <strong> Chat Sabrina </strong>
      </Link>

      <div className="flex items-center space-x-4">
        {/* <div className="cursor-not-allowed">
          <ChatCircle size={24} />
        </div> */}

        <Link href="/prompts">
          <ChatCircle size={24} className="hover:text-black dark:hover:text-white duration-200 " />
        </Link>

        <ToggleThemeIcon className="w-6 h-6 cursor-pointer hover:text-black dark:hover:text-white duration-200" onClick={toggleTheme} />
      </div>
    </header>
  );
}
