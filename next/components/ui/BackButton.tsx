"use client";
import React from "react";
import { Button } from "./button";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()}>Home</Button>
    </div>
  );
}

export default BackButton;
