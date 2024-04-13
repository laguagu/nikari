"use client";
import { useChat } from "ai/react";
import clsx from "clsx";
import { UserIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Message } from "ai/react";
import Link from "next/link";
import ChatFormComponent from "./ChatFormComponent";
import { CardHover } from "./CardHover";
import { roboto_mono } from "@/app/fonts";

const initialPrompt = "Mihin kaipaat apua?";

export default function Chat() {
  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    append,
  } = useChat({
    // initialInput: initialPrompt,
  });
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);

  const updateUserMessage = (content: string) => {
    setLocalMessages((prevMessages) => [
      ...prevMessages,
      { id: String(prevMessages.length + 1), role: "user", content } as Message,
    ]);
  };

  const updateAssistantMessage = (content: string) => {
    setLocalMessages((prevMessages) => [
      ...prevMessages,
      {
        id: String(prevMessages.length + 1),
        role: "assistant",
        content,
      } as Message,
    ]);
  };

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
      <div>
        <CardHover />
      </div>
    </div>
  );
}
