"use server";

import axios from "axios";

export async function getMaterials(image_url: string) {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/visio/",
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
