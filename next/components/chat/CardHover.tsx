import { HoverEffect } from "../ui/card-hover-effect";

export function CardHover() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={projects} />
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
    title: "Find a Dealer",
    description:
      "I want to know where the nearest Nikari furniture dealer is located.",
    link: "/care",
  },
  {
    title: "Talk to Nikari AI",
    description:
      "None of the above. Proceed to chat with the Nikari AI assistant.",
    link: "/care",
  },
];
