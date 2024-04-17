"use client";
import { useChat } from "ai/react";
import clsx from "clsx";
import { UserIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { use, useEffect, useRef, useState } from "react";
import { Message } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Comment } from "react-loader-spinner";

interface ChatFormProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
const endPoint = "/api/chat/lang";
export default function ChatMessages() {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
  } = useChat({
    initialInput: "",
    api: endPoint,
    // initialMessages: [
    //   {
    //     id: "1",
    //     role: "user",
    //     content:
    //       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis rerum, totam harum praesentium, ad corrupti animi eos sunt asperiores hic accusantium molestias. Atque autem nemo, quidem itaque modi hic eius.",
    //   },
    //   {
    //     id: "2",
    //     role: "assistant",
    //     content:
    //       " Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis rerum, totam harum praesentium, ad corrupti animi eos sunt asperiores hic accusantium molestias. Atque autem nemo, quidem itaque modi hic eius.",
    //   },
    // ],
  });

  useEffect(() => {
    if (messageContainerRef.current) {
      const { current } = messageContainerRef;
      current.scrollTop = current.scrollHeight - current.clientHeight;
    }
  }, [messages]); // This ensures the effect runs every time messages update

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || loadingResponse) return; // Prevent sending empty messages or multiple messages while loading
    const messagesWithUserReply = messages.concat({
      id: messages.length.toString(),
      content: input,
      role: "user",
    });

    setMessages(messagesWithUserReply);

    setLoadingResponse(true);
    setInput("");

    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: messagesWithUserReply,
      }),
    });

    if (!response.ok) {
      console.error("Failed to send message", response);
      setLoadingResponse(false);
      return;
    }
    const newMessages = messagesWithUserReply;

    const responseText = await response.text();
    const gptAnswer = responseText;

    setLoadingResponse(false);
    setMessages([
      ...newMessages,
      { id: messages.length.toString(), role: "assistant", content: gptAnswer },
    ]);

    // const reader = response.body?.getReader();
    // let result = '';
    // while (true) {
    //   if (!reader) {
    //     break;
    //   }
    //   const { done, value } = await reader.read();
    //   if (done) {
    //     break;
    //   }
    //   result += new TextDecoder("utf-8").decode(value);
    // }
    // console.log(result);
  };

  return (
    <div>
      <div
        className="max-h-[55vh] space-y-4 overflow-y-auto"
        ref={messageContainerRef}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={clsx(
              "text-2xl items-center flex text-gray-900 font-mono mb-3",
              {
                "justify-start text-left": message.role === "user",
                "justify-end text-right": message.role === "assistant",
              }
            )}
          >
            {message.role === "user" ? (
              <UserIcon className="w-5 mr-1 ml-1 flex-shrink-0" />
            ) : (
              <RocketLaunchIcon className="w-5 mr-1 flex-shrink-0 right-0" />
            )}
            <div className="text-2xl max-w-3xl overflow-auto break-words bg-gray-200 rounded-lg p-2 ">
              {message.content}
            </div>
          </div>
        ))}
        {loadingResponse && aiLoadingMessage()}
      </div>
      <form onSubmit={sendMessage}>
        <div className="flex gap-4 items-center mt-4">
          <Input
            type="text"
            value={input}
            className="flex-1 border-2 p-2 rounded-md text-black font-semibold"
            placeholder="Type your message..."
            onChange={handleInputChange}
          />
          <Button
            className="h-[3rem] w-20 shrink-0"
            type="submit"
            disabled={loadingResponse}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

function aiLoadingMessage() {
  return (
    <div className="text-2xl flex justify-end">
      <div className="flex items-center text-gray-900 font-mono mb-3">
        <div className="text-2xl max-w-3xl overflow-auto break-words rounded-lg p-2">
          <Comment
            height="56"
            width="56"
            color="#FFF"
            backgroundColor="#2E2E2E"
          />
        </div>
      </div>
    </div>
  );
}

// Apu funktiota jos haluat lisätä viestin käyttäjälle tai avustajalle localMessages tilaan
// const updateUserMessage = (content: string) => {
//   setLocalMessages((prevMessages) => [
//     ...prevMessages,
//     { id: String(prevMessages.length + 1), role: "user", content } as Message,
//   ]);
// };

// const updateAssistantMessage = (content: string) => {
//   setLocalMessages((prevMessages) => [
//     ...prevMessages,
//     {
//       id: String(prevMessages.length + 1),
//       role: "assistant",
//       content,
//     } as Message,
//   ]);
// };

// Fetch stream example ehkä toimii
// async function fetchStream() {
//   const response = await fetch('/api/your-endpoint');
//   const reader = response.body.getReader();
//   let receivedLength = 0;
//   let chunks = [];
//   while(true) {
//     const { done, value } = await reader.read();
//     if (done) {
//       break;
//     }
//     chunks.push(value);
//     receivedLength += value.length;
//     // Prosessoi jokainen palanen tässä, esim. muuntaa tekstiksi ja päivittää tilaa
//   }
//   const completeResponse = new TextDecoder("utf-8").decode(new Uint8Array(chunks));
//   console.log('Full response received:', completeResponse);
// }
