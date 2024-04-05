"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { UserIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import React from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import SparklesUnder from "./ui/sparkles-under";

export interface Message {
  text: string;
  sender: "user" | "assistant";
}

const words = `You're now chatting with a AI powered support agent. Ask us anything!`;

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-auto rounded-md">
      <h1 className="md:text-5xl text-3xl lg:text-7xl font-bold text-centerrelative z-20 mb-3 text-white">
        Tsätti
      </h1>

      <div className="grid w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-6xl grid-cols-1 gap-4 p-4 rounded-lg border-2 shadow-xl border-gray-200 dark:border-gray-800 mx-auto bg-zinc-100">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Support</h2>
          <TextGenerateEffect words={words} className="border-b" />
        </div>
        <div className="max-h-[500px] space-y-4 overflow-y-auto">
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
                <RocketLaunchIcon className="w-5 mr-1 flex-shrink-0" />
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
      <SparklesUnder />
    </div>
  );
}
