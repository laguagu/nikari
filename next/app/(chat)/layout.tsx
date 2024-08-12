import { HomeButton } from "@/components/ui/HomeButton";
import Link from "next/link";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white bg-dot-black/[0.2] w-full flex flex-col items-center justify-center overflow-y-hidden overflow-x-hidden rounded-md pb-10">
      <h1 className="md:text-5xl text-3xl lg:text-6xl font-bold text-centerrelative z-20 mb-3 text-black mt-4">
        <Link href={"/"}>Care-Instructor</Link>
      </h1>
      <div className="grid w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl grid-cols-1 gap-4 p-4 rounded-lg border-2 shadow-xl border-gray-200 dark:border-gray-800 mx-auto bg-zinc-100">
        <div className="space-y-2">
          <div className="flex justify-center items-end mb-4">
            <HomeButton />
          </div>
          <div className="border-b-2"></div>
        </div>
        {children}
        <Toaster richColors position="bottom-center" />
      </div>
    </div>
  );
}
