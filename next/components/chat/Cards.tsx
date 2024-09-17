"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const MotionDiv = motion.create("div");
const MotionCard = motion.create(Card);

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
    <div className="flex gap-3 sm:gap-5 flex-col max-w-2xl w-full mx-auto">
      <div className="grid grid-cols-3 gap-4 sm:gap-6">
        {cardSteps.map((step, index) => (
          <MotionDiv
            key={index}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div className="mb-2 sm:mb-3">
              <span className="text-3xl sm:text-4xl font-light text-[#5c5c5c]">
                {index + 1}
              </span>
            </div>
            <div>
              <p className="text-sm sm:text-base text-foreground">
                {step.description}
              </p>
            </div>
            {index < cardSteps.length && (
              <div className="w-8 h-px bg-[#5c5c5c] mt-4 sm:mt-6 opacity-30"></div>
            )}
          </MotionDiv>
        ))}
      </div>
      <Link href="/care" className="w-full mt-6 sm:mt-8">
        <MotionDiv
          className="bg-white rounded-lg shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
          whileHover={{
            y: -4,
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="p-4 sm:p-6">
            <h3 className="text-lg text-center text-[#5c5c5c] sm:text-xl font-medium mb-4">
              Get started
            </h3>
            <Button
              className="w-full font-normal bg-[#202020] text-white hover:bg-[#333333] hover:text-white transition-colors duration-300"
              size="default"
            >
              Start now <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </MotionDiv>
      </Link>
    </div>
  );
};

export function Cards() {
  return (
    <div className="flex flex-col items-center px-4 sm:px-6 py-8 sm:py-12 mx-auto bg-background">
      <h2 className="text-xl sm:text-2xl font-light text-[#5c5c5c] mb-6 sm:mb-8 text-center">
        How It Works
      </h2>
      <CardSteps />
    </div>
  );
}
