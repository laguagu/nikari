"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const MotionDiv = motion.create('div')
const MotionCard = motion.create(Card)

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
]

export const CardSteps = () => {
  return (
    <div className="flex flex-col gap-12 max-w-2xl w-full mx-auto">
      {cardSteps.map((step, index) => (
        <MotionDiv
          key={index}
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <div className="mb-4">
            <span className="text-5xl font-light text-[#5c5c5c]">{index + 1}</span>
          </div>
          <div>
            <p className="text-lg md:text-xl text-foreground max-w-md">
              {step.description}
            </p>
          </div>
          {index < cardSteps.length - 1 && (
            <div className="w-px h-12 bg-[#5c5c5c] my-6 opacity-30"></div>
          )}
        </MotionDiv>
      ))}
      <Link href="/care" className="w-full mt-8">
        <MotionCard
          className="bg-[#202020]  hover:bg-[#4a4a4a] transition-colors duration-300 cursor-pointer"
          whileHover={{ y: -2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <CardContent className="flex items-center justify-between p-6">
            <h3 className="text-xl md:text-2xl font-medium text-white">
              Get started
            </h3>
            <Button
              className="font-normal bg-white text-[#5c5c5c] hover:bg-gray-100 hover:text-[#4a4a4a]"
              size="lg"
            >
              Start now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </MotionCard>
      </Link>
    </div>
  )
}

export function Cards() {
  return (
    <div className="flex flex-col items-center px-4 md:px-6 py-12 md:py-16 mx-auto bg-background">
      <h2 className="text-2xl md:text-3xl font-light text-[#5c5c5c] mb-12 text-center">
        How It Works
      </h2>
      <CardSteps />
    </div>
  )
}