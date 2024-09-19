"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const MotionDiv = motion.create("div");

const cardSteps = [
  {
    description: "Take a picture",
  },
  {
    description: "Review and adjust",
  },
  {
    description: "Explore care instructions",
  },
];

export const CardSteps = () => {
  return (
    <div className="flex flex-col items-center max-w-md w-full mx-auto">
      <div className="w-full mb-6">
        {cardSteps.map((step, index) => (
          <MotionDiv
            key={index}
            className="flex flex-col items-center text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <span className="text-2xl font-light text-black mb-2 relative">
              {index + 1}.
            </span>
            <p className="text-sm text-foreground">{step.description}</p>
          </MotionDiv>
        ))}
      </div>
      <Link href="/care" className="w-full">
        <MotionDiv
          className="bg-transparent rounded-lg transition-all duration-300 cursor-pointer overflow-hidden"
          whileHover={{
            y: -4,
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="p-4">
            <Button
              className="w-full font-normal bg-[#202020] text-white hover:bg-[#333333] hover:text-white transition-colors duration-300"
              size="default"
            >
              Start now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </MotionDiv>
      </Link>
    </div>
  );
};

export function Cards() {
  return (
    <div className="flex flex-col items-center px-4 py-8 mx-auto rounded-lg">
      <h2 className="text-xl text-[#5c5c5c] mb-6 text-center">How It Works</h2>
      <CardSteps />
    </div>
  );
}
