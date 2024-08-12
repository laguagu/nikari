"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BackButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div>
      <Button onClick={() => router.back()}>{children}</Button>
    </div>
  );
}
