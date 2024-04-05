"use client";
import { useState, useEffect } from "react";
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

const questions = [
  { id: 1, text: "Mihin huonekaluun kaipaat apua?", type: "choice", choices: ["Sänky", "Pöytä", "Tuoli"] },
  { id: 2, text: "Minkä värinen huonekalu on?", type: "text" },
];

const words = `You're now chatting with a AI powered support agent. Ask us anything!`;

export default function Chat() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [allAnswered, setAllAnswered] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, append } = useChat();

  useEffect(() => {
    setAllAnswered(Object.keys(answers).length === questions.length);
  }, [answers]);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestionIndex].id]: answer });
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const sendToChatGPT = async (prompt: any) => {
    try {
      await append({ role: "system", content: prompt });
    } catch (error) {
      console.error("Virhe lähettäessä promptia ChatGPT:lle:", error);
    }
  };

  function generatePrompt(answers: any[]) {
    return `Asiakas tarvitsee apua ${answers[1]} väriseen ${answers[2]} huonekaluun.`;
  }
  
  const handleChatSubmit = () => {
    if (allAnswered) {
      const prompt = generatePrompt(Object.values(answers));
      sendToChatGPT(prompt);
    } else {
      handleAnswer(input);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
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
       
      <form onSubmit={handleChatSubmit}>
        {!allAnswered ? (
          <div>
            <p>{currentQuestion.text}</p>
            {currentQuestion.type === "choice" ? (
              currentQuestion.choices?.map((choice) => (
                <button key={choice} onClick={() => handleAnswer(choice)}>
                  {choice}
                </button>
              ))
            ) : (
              <Input
                type="text"
                value={input}
                onChange={handleInputChange}
              />
            )}
          </div>
        ) : (
          <Input
            type="text"
            value={input}
            placeholder="Kirjoita viestisi..."
            onChange={handleInputChange}
          />
        )}
        <Button type="submit">Lähetä</Button>
      </form>
      </div>
      <SparklesUnder />
    </div>
  );
}
