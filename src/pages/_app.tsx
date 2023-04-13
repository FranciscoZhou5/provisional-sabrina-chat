import { ChatProvider } from "@/context/ChatContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Inter } from "next/font/google";

const inter = Inter({
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
          }
        `}
      </style>
      <Component {...pageProps} />
    </ChatProvider>
  );
}
