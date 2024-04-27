import { Suspense } from "react";
import { HoverEffect } from "../ui/card-hover-effect";

export function CardHover() {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <Suspense fallback={<div>Loading cards...</div>}>
        <HoverEffect items={projects} />
      </Suspense>
    </div>
  );
}

export const projects = [
  {
    title: "Step 1 - Take a picture",
    description:
      "Capture a clear photo of your furniture that you are seeking care instructions for. Ensure the photo is well-lit and the entire piece of furniture is visible in the shot.",
    link: "/",
  },
  {
    title: "Step 2 - Review and adjust",
    description:
      "Examine the materials identified by AI and make any necessary adjustments: you can add missing materials or remove incorrectly identified ones. Check the boxes for the materials you want to keep on the list.",
    link: "/",
  },
  {
    title: "Step 3 - Explore care instructions",
    description:
      "You can now access the care instructions for the selected materials. Read the instructions carefully to ensure you maintain your furniture in the best possible condition.",
    link: "/",
  },
  {
    title: "Click here to continue",
    description:
      "Click here to start identifying the materials of your furniture.",
    link: "/care",
  },
];
