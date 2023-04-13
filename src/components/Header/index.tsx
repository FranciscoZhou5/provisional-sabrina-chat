import useTheme from "@/hook/useTheme";
import { Sun, Moon } from "@phosphor-icons/react";

export default function Header() {
  const { toggleTheme, theme } = useTheme();

  const ToggleThemeIcon = theme === "light" ? Sun : Moon;

  return (
    <header className="h-12 flex justify-between items-center px-4 md:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800">
      <div>
        <strong> Chat Sabrina </strong>
      </div>

      <div>
        <ToggleThemeIcon className="text-black dark:text-white w-6 h-6 cursor-pointer" onClick={toggleTheme} />
      </div>
    </header>
  );
}
