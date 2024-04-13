"use client";
import { CreditCardIcon } from "@heroicons/react/24/outline";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-xl font-medium">Hello user!</p>
          <CreditCardIcon className="h-20 w-20 mb-3 text-blue-400 mt-10" />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
