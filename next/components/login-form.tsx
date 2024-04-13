"use client";
import { useFormState, useFormStatus } from "react-dom";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { authenticate } from "../lib/actions";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  console.log(errorMessage, "............errorMessage............");

  return (
    <div className="w-full">
      <form
        className="bg-gray-50 px-6 pb-4 pt-8 space-y-3 rounded-lg"
        action={dispatch}
      >
        <div className="mb-3 block font-medium text-gray-900">
          <h1 className="text-2xl mb-3">Please log in to continue.</h1>
        </div>
        <div>
          <label
            className="block mb-3 mt-5 text-base text-gray-900 font-medium"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="mt-4">
          <label
            className="block mb-3 text-base text-gray-900 font-medium"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            required
          />
        </div>
        <LoginButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full mt-4 flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
      aria-disabled={pending}
    >
      Log in <ArrowRightIcon className="h-5 w-5 ml-auto" />
    </button>
  );
}
