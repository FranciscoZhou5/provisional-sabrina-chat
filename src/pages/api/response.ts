import { ChatMessage } from "@/context/ChatContext";
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { messages } = (await req.json()) as {
    messages?: ChatMessage[];
  };

  if (!messages) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const payload: OpenAIStreamPayload = {
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    stream: true,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
};

export default handler;
