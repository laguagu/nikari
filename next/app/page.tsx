"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { UserIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import React, { use, useEffect, useState } from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import SparklesUnder from "@/components/chat/sparkles-under";
import { Message } from "ai/react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ImageUploadComponent from "@/components/chat/ImageUploadComponent";
import LocationQueryComponent from "@/components/chat/LocationQueryComponent";
import FormComponent from "@/components/chat/FormComponent";

const words = `You're now chatting with a AI powered support agent. Ask us anything!`;

const hoitoOhjeet: { [key: string]: string } = {
  Tuoli:
    "Furniture made of solid wood has many esthetic and performance related benefits, which need to be maintained with proper care. Please notice, that cold and dry winter climate together with the heating indoors creates very dry environment which can be unhealthy to people as well as the furniture of the house. Also, during very humid months the furniture may suffer without proper care. In dry winter climate the wood may shrink. This causes cracks, which is a very natural reacti on of the wood to its environment. This kind of cracks will usually disappear when the climate turns more humid and the wood swells. However, if you notice a crack between two planks showing a separation of a glue line, please contact us. In very humid tim es the wood might swell and cause problems with moving parts such as drawers. In these cases the wood will slowly shrink back to original dimensions once the climate becomes dryer.",
  Ulkokäytössä:
    "We use wood oil for outdoors as the surface treatment material. It is highly recommended to prevent the surfaces from becoming wet by wiping them clean and dry as soon as possible when they have been left in the rain. We kindly ask you to acknowledge, that the UV Protection Oil helps to maintain the origina l colouring of the wood. However, little by little wood begins to gray outdoors. The graying process is unique with each product, and in between the colours the wooden surface might look odd with all the dots and spots. All our terrace furniture is designed keeping this graying process in mind: they will look absolutely beautiful when totally gray, and the durability of the joints will not be affected throughout the color change. We recommend moving the furniture indoors well in advance before the rainy season begins. We recommend oiling the furniture regularly . In case the products stay outside throughout the summer, they usually n eed treatment every year. When you start, please rem ove all the dirt from wood. You can then add OsmoColor UV Protection Oil to the dry and clean surface. Please follow the instructions on the packaging carefully. NB: Oak wood is very sensitiv e to iron oxide. The i ron particles in the air are very efficient in making dark spots , when they mix with water on the surface of the wood material . As a consequence the surface develop s black spots or bigger dark areas. This doesn ’t affect the the durability of the material.",
  leather:
    "As with any other material for interior design, a laminate surface should be cleaned regularly. It does not require any special maintenance, just a damp cloth with warm water or a mild detergent. Almost all regular household cleaning products or disinfectants can be safely used. For the most common stains, you can simply clean the surface with warm water using a non - abrasive cloth. Tougher stains can be removed with non - a brasive household cleaners or solvents. For older, dried or caked - on stains, use a magic sponge or soft cloth to remove them. After using any solvents, we recommend rinsing the surface with warm water and a detergent. Always rinse thoroughly to remove the detergent with clean water, preferably warm.",
  wood: "We use natural wood oil mixtures as the surface finish. Please note that you should always wipe the surface clean and dry of any liquids as soon as possible (in 15 minutes). Clean the surface normally with a damp cloth, using organic soaps. In order to keep your table in be st possible condition, you should clean the table top with the very finest sandy cloth once in two years. After that, treat the table top with a natural matte wood oil or wax. Let the oil - wax impregnate for 15 - 20 min, and wipe the rest off. Use a clean clo th to finish and polish the surface in the end. Please follow the instructions of the surface finish oil mixture product you are using . ( Natural treatment sprays can be used as well. NB: do not use silicone based or other non - natural treatment oils or waxes. ) In c ase your product is treated with stain and/or ( water - based ) lacquer , it is good to know that the lacquer keeps the wooden surface protected of liquids and dirt very effectively. When some spilling or staining occurs, i t is recommended to wipe it clean and dry quickly with a damp cloth, using organic soaps. In case the water - based lacquer surface is damaged, it should be sanded and the lacquer treatment redone.",
  Sisäkäytössä:
    "Leather is a natural material. With correct care and maintenance premium vegetable tanned leather will age gracefully, developing a beautiful patina with use over time. General advice Exposure to direct sunlight will darken “blonde” colors an d bleach darker colors. Hot, dry air can dry out leather if it is not regularly conditioned. Certain chemicals and detergents can damage the surfac e of the leather and tarnish the color. Cleaning Anytime that your leather is stained or when it has dried out after being wet repeat step 1 and 2. Over time you will develop your own “hand feel” for when cleaning or care is needed. STEP 1: Remove any dirt or stains with a clean natural spon ge or soft cloth before applying any oils or condit ioners. Varieties of leather leaning products are available and can be divided into two groups distinguished b y their active ingredients: - Surfectants that clean the surface of the leather - Leather soaps that deep clean Try both types of cleaners to find your preference. STEP 2: After cleaning, it is important to apply something that will nourish the leather, protect it and help it to retain moisture. Use a product that contains a natural wax. The wax will protect t he leather in the same way that wax protects the pa int of a car",
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
  const [activeComponent, setActiveComponent] = useState("");
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

  useEffect(() => {
    setMessages(localMessages);
  }, [localMessages, setMessages]);

  useEffect(() => {
    console.log(answers, "answers");
  }, [answers]);

  const handleBackClick = () => {
    setShowOptions(true);
    setMessages([]);
    setActiveComponent("");
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

  type ButtonProps = {
    label: string;
    userMessage: string;
    assistantMessage: string;
  };

  type AssistantMessageWithButtonsProps = {
    message: string;
    buttons: ButtonProps[];
  };

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

  // Lisää funktio, joka käsittelee kuvan lähetyksen jälkeistä logiikkaa
  const handleImageSent = () => {
    setActiveComponent("");
    setShowOptions(true)
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "imageUpload":
        return <ImageUploadComponent onImageSent={handleImageSent}/>;
      case "locationQuery":
        return <LocationQueryComponent />;
      case "form":
        return (
          <FormComponent
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <div>Valitse vaihtoehto</div>;
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-200 w-full bg-Ö flex flex-col items-center justify-center overflow-y-hidden rounded-md">
      <h1 className="md:text-5xl text-3xl lg:text-7xl font-bold text-centerrelative z-20 mb-3 text-white">
        <Link href={"/"}>Nikari AI</Link>
      </h1>

      {currentQuestionIndex < questions.length &&
        currentQuestion.choices.map((choice) => (
          <button key={choice} onClick={() => handleChoice(choice)}>
            {choice}
          </button>
        ))}

      <div className="grid w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-6xl grid-cols-1 gap-4 p-4 rounded-lg border-2 shadow-xl border-gray-200 dark:border-gray-800 mx-auto bg-zinc-100">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Support</h2>
          <TextGenerateEffect words={words} />
          <Separator />
        </div>
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
          {showOptions && (
            <div className="flex justify-center space-x-3 items-center">
              <button
                onClick={() => {
                  setActiveComponent("imageUpload");
                  setShowOptions(false);
                }}
              >
                1. Auta minua löytämään hoito-ohjeet huonekalulleni valokuvan
                perusteella.
              </button>
              <button
                onClick={() => {
                  setActiveComponent("locationQuery");
                  setShowOptions(false);
                }}
              >
                2. Haluan tietää, missä on lähin Nikari-huonekalujen
                jälleenmyyjä.
              </button>
              <button
                onClick={() => {
                  setActiveComponent("form");
                  updateAssistantMessage("Hei. Miten voin auttaa?");
                  setShowOptions(false);
                }}
              >
                3. Ei mikään seuraavista. Siirry keskustelemaan Nikari-AI
                avustajan kanssa.
              </button>
            </div>
          )}

          <div>{renderComponent()}</div>
          {!showOptions && (
            <button onClick={handleBackClick}>Palaa takaisin</button>
          )}
        </div>

        {/* <AssistantMessageWithButtons
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
        /> */}
      </div>
      <SparklesUnder />
    </div>
  );
}
