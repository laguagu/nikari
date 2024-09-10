"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionCard = motion.create(Card);

const cardSteps = [
  {
    title: "Step 1",
    description: "Take a picture",
  },
  {
    title: "Step 2",
    description: "Review and adjust",
  },
  {
    title: "Step 3",
    description: "Explore care instructions",
  },
];

export const CardSteps = () => {
  const cardSettings = {
    whileHover: { scale: 1.01 },
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.1, duration: 0.4 },
  };
  return (
    <div className="flex flex-col gap-6 max-w-2xl w-full mx-auto">
      {cardSteps.map((step, index) => (
        <MotionCard
          {...cardSettings}
          key={index}
          className=" shadow-sm bg-gray-50 hover:shadow-md transition-shadow duration-300 border border-gray-100"
        >
          <CardContent className="flex  flex-col items-center justify-center p-6">
            <h3 className="text-lg md:text-xl font-normal text-gray-800 mb-2">
              {step.title}
            </h3>
            <span className="text-base text-gray-600">{step.description}</span>
          </CardContent>
        </MotionCard>
      ))}
      <Link href={"/care"} className="w-full">
        <MotionCard
          className="shadow-sm bg-gray-100 hover:bg-gray-200 transition-colors duration-300 border border-gray-200 cursor-pointer"
          whileHover={{ scale: 1.01 }}
          initial={{ opacity: 0, y: 20, scale: 1.05 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <h3 className="text-lg md:text-xl font-normal text-gray-800 mb-4">
              Get started
            </h3>
            <Button
              className="mt-2 font-normal bg-gray-700 hover:bg-gray-800 text-white transition-colors duration-300"
              size="lg"
            >
              Click here
            </Button>
          </CardContent>
        </MotionCard>
      </Link>
    </div>
  );
};

export function Cards() {
  return (
    <div className="flex flex-col items-center px-4 md:px-6 py-8 md:py-12 mx-auto bg-white bg-opacity-10 border-white border-2 shadow-md rounded-lg">
      <div className="flex flex-col max-w-2xl w-full mx-auto">
        <CardSteps />
      </div>
    </div>
  );
}
