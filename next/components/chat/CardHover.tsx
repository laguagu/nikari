import { Suspense } from "react";
import { HoverEffect } from "../ui/card-hover-effect";

export function CardHover() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <Suspense fallback={<div>Loading...</div>}>
        <HoverEffect items={projects} />
      </Suspense>
    </div>
  );
}

export const projects = [
  {
    title: "Find Care Instructions",
    description:
      "Help me find care instructions for my furniture based on a photo.",
    link: "/care",
  },
  {
    title: "Find a retailer",
    description:
      "I want to know where the nearest Nikari furniture Agents, Dealers and Retailer is located.",
    link: "/location",
  },
  {
    title: "Talk to Nikari AI",
    description:
      "None of the above. Proceed to chat with the Nikari AI assistant.",
    link: "/chatbot",
  },
];
