"use client";
import { useChat } from "ai/react";
import clsx from "clsx";
import { UserIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Message } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatFormProps {
  input: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function ChatMessages() {
  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    append,
  } = useChat({
    initialInput: "",
  });

  const [localMessages, setLocalMessages] = useState<Message[]>(messages);
  return (
    <div>
      <div className="max-h-[55vh] space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={clsx(
              "text-2xl items-center flex text-gray-900 font-mono",
              {
                "justify-start": message.role === "user",
                "justify-end": message.role === "assistant",
              }
            )}
          >
            {message.role === "user" ? (
              <UserIcon className="w-5 mr-1 ml-1 flex-shrink-0" />
            ) : (
              <RocketLaunchIcon className="w-5 mr-1 flex-shrink-0 right-0" />
            )}
            <div className="text-2xl max-w-3xl overflow-auto break-words bg-gray-100 rounded-lg p-1 mr-1">
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center">
          <Input
            type="text"
            value={input}
            className="flex-1 border-2 p-2 rounded-md text-black font-semibold"
            placeholder="Type your message..."
            onChange={handleInputChange}
          />
          <Button className="h-[3rem] w-20 shrink-0" type="submit">
            Send
          </Button>
        </div>
      </form>
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
