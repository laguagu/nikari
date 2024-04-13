"use server";

import axios from "axios";
import { AuthError } from "next-auth";

export async function getMaterials(image_url: string) {
  try {
    const response = await axios.post(
      "https://webchat-nodetesti.rahtiapp.fi/api/visio", // Tarvitsee tämän kun viet rahti tuotantoon. Et voi viitata localhostiin
      { image_url: image_url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const materials = JSON.parse(response.data.message.content);
    return materials;
  } catch (error) {
    console.error("Virhe kuvan lähetyksessä:", error);
  }
}

import { signIn } from "@/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  "use server";
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("formData emaiol", formData.get("email"));

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "http://localhost:3000/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        case "CallbackRouteError":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
