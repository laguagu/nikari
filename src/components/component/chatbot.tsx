import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import chatbotApi from "@/api/chatBotApi";
import clsx from "clsx";
import { UserIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

export interface Message {
  text: string;
  sender: "user" | "assistant";
}

export function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");

  const handeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);

    setUserInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessages = [
      ...messages,
      { text: userInput, sender: "user" as "user" | "assistant" },
    ];
    setMessages(newMessages);

    try {
      // Hae chatbotin vastaus
      const botResponse = await chatbotApi(newMessages);
      // Lisää chatbotin vastaus viesti taulukkoon
      setMessages(
        newMessages.concat([
          { text: botResponse.response, sender: "assistant" },
        ])
      );
    } catch (error) {
      console.error("Failed to get chatbot response");
    }
    setUserInput("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-zinc-50">
      <div className="grid w-full max-w-6xl grid-cols-1 gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Support</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You're now chatting with a support agent. Ask us anything!
          </p>
        </div>
        <div className="max-h-[500px] space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={clsx(
                "text-2xl items-center flex text-gray-900 font-mono",
                {
                  "justify-start": message.sender === "user",
                  "justify-end": message.sender === "assistant",
                }
              )}
            >
              {message.sender === "user" ? (
                <UserIcon className="w-5 mr-1 ml-1 flex-shrink-0" />
              ) : (
                <RocketLaunchIcon className="w-4 mr-1 flex-shrink-0" />
              )}
              <div className="text-2xl max-w-3xl overflow-auto break-words bg-gray-100 rounded-lg p-1 mr-1">
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <Input
              type="text"
              value={userInput}
              className="flex-1 border-2 p-2 rounded-md"
              placeholder="Type your message..."
              onChange={handeInputChange}
            />
            <Button className="h-[3rem] w-20 shrink-0" type="submit">
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
