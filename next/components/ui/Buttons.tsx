"use client";
import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";
import Link from "next/link";

function BackButton() {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()}>Home</Button>
    </div>
  );
}

export function HomeButton() {
  return (
    <div>
      <Link href={"/"}>
        <Button>Home</Button>
      </Link>
    </div>
  );
}

export default BackButton;
