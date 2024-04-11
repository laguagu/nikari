"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { UserIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Message } from "ai/react";
import Link from "next/link";
import hoitoOhjeet from "@/lib/hoitoOhjeet";

type ButtonProps = {
  label: string;
  userMessage: string;
  assistantMessage: string;
};

type AssistantMessageWithButtonsProps = {
  message: string;
  buttons: ButtonProps[];
};

const questions = [
  {
    id: 1,
    text: "Minkä tyyppistä huonekalua haluat hoitaa?",
    choices: ["Tuoli", "Pöytä", "Sohva"],
  },
  {
    id: 2,
    text: "Mistä materiaalista huonekalusi on valmistettu?",
    choices: ["wood", "leather", "laminate"],
  },
  {
    id: 3,
    text: "Onko huonekalusi sisä- vai ulkokäytössä?",
    choices: ["Sisäkäytössä", "Ulkokäytössä"],
  },
  // Lisää kysymyksiä tarpeen mukaan...
];

const initialPrompt = "Mihin kaipaat apua?";
const choices = ["Valinta 1", "Valinta 2"];

// Function to get care instructions based on user's answers
function getCareInstructions(answers: string[]) {
  // Initialize an empty string to store the care instructions
  let instructions = "";

  // Loop through the user's answers
  for (let answer of answers) {
    // Get the care instructions for the answer
    let instruction = hoitoOhjeet[answer];

    // If instructions found, add them to the instructions string
    if (instruction) {
      instructions += instruction + "\n\n";
    }
  }

  // If no instructions found, return a default message
  if (!instructions) {
    return "Sorry, we don't have care instructions for that.";
  }

  return instructions;
}
// function generatePrompt(answers: any[]) {
//   return `Asiakas tarvitsee apua ${answers[0]} huonekaluun jonka materiaali
//    on ${answers[1]}. Huonekalu on ${answers[2]} käyttöön.`;
// }

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

  const handleChoice = (choice: string) => {
    setAnswers((prevAnswers) => {
      const newAnswers = {
        ...prevAnswers,
        [questions[currentQuestionIndex].id]: choice,
      };
      if (currentQuestionIndex >= questions.length - 1) {
        // Kaikki kysymykset on esitetty, muodosta viesti ja lähetä se backendille
        const message = getCareInstructions(Object.values(newAnswers));
        setLocalMessages([
          ...messages,
          { id: "1", role: "assistant", content: message },
        ]);
        // append({ role: "user", content: message });
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return newAnswers;
    });
  };

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

  const currentQuestion = questions[currentQuestionIndex];

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
{
  /* {currentQuestionIndex < questions.length &&
        currentQuestion.choices.map((choice) => (
          <button key={choice} onClick={() => handleChoice(choice)}>
            {choice}
          </button>
        ))} */
}

{
  /* <AssistantMessageWithButtons
          message="Tarvitsetko vielä apua?"
          buttons={[
            {
              label: "Kyllä",
              userMessage: "Kyllä",
              assistantMessage: "Miten voin auttaa?",
            },
            {
              label: "Ei",
              userMessage: "Ei",
              assistantMessage: "Kiitos keskustelusta!",
            },
          ]}
        /> */
}
/*
const AssistantMessageWithButtons: React.FC<
AssistantMessageWithButtonsProps
> = ({ message, buttons }) => {
return (
  <div>
    <p>{message}</p>
    {buttons.map((button, index) => (
      <button
        key={index}
        onClick={() => {
          updateUserMessage(button.userMessage);
          updateAssistantMessage(button.assistantMessage);
        }}
      >
        {button.label}
      </button>
    ))}
  </div>
);
};
*/
