"use client"
import SparklesUnder from '@/components/chat/sparkles-under'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { UserIcon } from '@heroicons/react/24/outline'
import { Separator } from '@radix-ui/react-separator'
import Link from 'next/link'
import React from 'react'

function Testi() {
  const words = `You're now chatting with a AI powered support agent. Ask us anything!`;
  return (
    <div className="min-h-screen bg-black w-full bg-Ö flex flex-col items-center justify-center overflow-y-hidden rounded-md">
      <h1 className="md:text-5xl text-3xl lg:text-7xl font-bold text-centerrelative z-20 mb-3 text-white">
        <Link href={"/"}>Nikari AI</Link>
      </h1>
      <div className="grid w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-6xl grid-cols-1 gap-4 p-4 rounded-lg border-2 shadow-xl border-gray-200 dark:border-gray-800 mx-auto bg-zinc-100">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Support</h2>
          <TextGenerateEffect words={words} />
          <Separator />
        </div>
        <div className="max-h-[55vh] space-y-4 overflow-y-auto">
        </div>
        <div>
          <div className="flex justify-center space-x-3 items-center">
            <button>
              <Link href={"/visio"}>
                1. Auta minua löytämään hoito-ohjeet huonekalulleni valokuvan
                perusteella.
              </Link>
            </button>
            <button>
              <Link href={"/visio"}>
                2. Haluan tietää, missä on lähin Nikari-huonekalujen
                jälleenmyyjä.
              </Link>
            </button>
            <button>
              <Link href={"/visio"}>
                3. Ei mikään seuraavista. Siirry keskustelemaan Nikari-AI
                avustajan kanssa.
              </Link>
            </button>
          </div>
          <button>Palaa takaisin</button>
        </div>
      </div>
      <SparklesUnder />
    </div>
  )
}

export default Testi