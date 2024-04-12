"use client";

import { useChat } from "ai/react";
import clsx from "clsx";
import { UserIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Message } from "ai/react";
import Link from "next/link";
import FormComponent from "@/components/chat/FormComponent";

const initialPrompt = "Mihin kaipaat apua?";

export default function Chat() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(true);
  const [answers, setAnswers] = useState({});
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
        <div className="flex justify-center space-x-3 items-center">
          <button>
            <Link href={"/care"}>
              1. Auta minua löytämään hoito-ohjeet huonekalulleni valokuvan
              perusteella.
            </Link>
          </button>
          <button>
            <Link href={"/care"}>
              2. Haluan tietää, missä on lähin Nikari-huonekalujen jälleenmyyjä.
            </Link>
          </button>
          <button>
            <Link href={"/care"}>
              3. Ei mikään seuraavista. Siirry keskustelemaan Nikari-AI
              avustajan kanssa.
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

