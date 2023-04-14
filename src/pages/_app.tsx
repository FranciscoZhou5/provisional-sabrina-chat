import { ChatProvider } from "@/context/ChatContext";
import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "highlight.js/styles/tokyo-night-dark.css";

import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--inter-font",
});

const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--inter-font",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChatProvider>
      <style jsx global>
        {`
          :root {
            --inter-font: ${inter.style.fontFamily};
            --jetbrains-mono-font: ${jetBrainsMono.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </ChatProvider>
  );
}
