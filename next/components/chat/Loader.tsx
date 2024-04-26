"use client";
import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Loader({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="mr-2">{children}</h1>
        <ThreeDots height="56" width="56" color="" />
      </div>
    </div>
  );
}
