"use client";
import SparklesUnder from "@/components/chat/sparkles-under";
import BackButton from "@/components/ui/BackButton";
import { Separator } from "@/components/ui/separator";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from 'next/navigation'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  let words = `You're now chatting with a AI powered support agent. Ask us anything!`
  const pathname = usePathname()
  if (pathname === "/chatbot") {
    words = `You're now chatting with a AI powered support agent. Ask us anything!`;
  } else if (pathname === "/care") {
    words = `Welcome to Nikari AI! Let's identify the materials of your furniture and provide care instructions.`;
  } else {
    words = `Welcome to Nikari AI! Ask about care instructions, dealers, or anything else.`;
  }
  
  
  return (
    <div className="min-h-screen bg-black w-full flex flex-col items-center justify-center overflow-y-hidden rounded-md">
      <h1 className="md:text-5xl text-3xl lg:text-7xl font-bold text-centerrelative z-20 mb-3 text-white mt-4">
        <Link href={"/"}>Nikari AI</Link>
      </h1>
      <div className="grid w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-6xl grid-cols-1 gap-4 p-4 rounded-lg border-2 shadow-xl border-gray-200 dark:border-gray-800 mx-auto bg-zinc-100">
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-bold">Support</h2>
            <BackButton />
          </div>
          <TextGenerateEffect key={pathname} words={words} />
          <Separator />
        </div>
        {children}
      </div>
      <SparklesUnder />
      <Toaster />
    </div>
  );
}
