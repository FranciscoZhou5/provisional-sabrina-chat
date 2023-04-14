import { Dispatch, SetStateAction, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ChatAgent = "user" | "system" | "assistant";

export interface ChatMessage {
  role: ChatAgent;
  content: string;
}

interface Error {
  status: number;
  message: string;
}

interface IChatContextValues {
  handleSendMessage: (message: string) => Promise<void>;
  messages: ChatMessage[];
  showHeroSection: boolean;
}

const ChatContext = createContext({} as IChatContextValues);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const date = new Date().toLocaleDateString("pt-BR", { dateStyle: "full" });

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      content: `
        Atue como uma assistente virtual que atende pelo nome de Sabrina. Eu irei enviar mensagens e você vai responder tudo, como se fosse a Sabrina. 
        Algumas informações relevantes que como uma assistente virtual necessita: 
          - Hoje é ${date}. 
          - Seu criado é Francisco Zhou Liu.
          - O Cronograma da escola é o seguinte(Cada matéria equivale a um período 50 minutos, estão ordenados em ordem que ocorrem. Se for dois períodos, serão duas aulas de 50 minutos seguindos e o recreio equivale a 20 minutos): 
            -Segunda: Estatística, Inglês, Matemática, Recreio, Biologia e Espanhol;
            -Terça: Filosofia, Educação Física, História, Recreio e dois períodos de Português;
            -Quarta: Biologia, Conversação em Língua Inglesa, Física, Recreio, Sociologia, Inglês, Aulas de tarde: Literatura e Artes(15:25) e Química(16:15); 
            -Quinta: Português, História, Química, Recreio, Geografia, Educação Física, Aulas de tarde: dois períodos de Soluções em Tecnologia(começando 14:20) e Literatura e Artes(16:15); 
            -Sexta: Geografia, dois períodos de matemática, Recreio, Espanhol e Física.
      `.trim(),
      role: "system",
    },
    //     {
    //       role: "assistant",
    //       content: `
    //         A propriedade \`classname\` é o class.

    // \`\`\`py
    //   function main() {
    //     console.log('main')
    //   }
    // \`\`\`
    //       `.trim(),
    //     },
  ]);

  const showHeroSection = useMemo(() => {
    return messages.length === 1;
  }, [messages]);

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (message.length === 0) {
        return;
      }

      setMessages((prev) => [...prev, { role: "user", content: message }]);

      const response = await fetch("/api/response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: message }],
        }),
      });

      if (!response.ok) {
        const { status } = response;

        console.log(`[ERROR] - ${response.statusText}`);

        throw new Error(response.statusText);
      }

      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        setMessages((prev) => {
          const newArr = [...prev];

          newArr[newArr.length - 1] = { ...newArr[newArr.length - 1], content: prev[prev.length - 1].content + chunkValue };

          return newArr;
        });
      }
    },
    [messages]
  );

  return (
    <ChatContext.Provider
      value={{
        handleSendMessage,
        messages,
        showHeroSection,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  return useContext(ChatContext);
}
