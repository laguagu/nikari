import axios from "axios";

export async function getMaterials(image_url: string) {
  try {
    const response = await axios.post(
      // "https://webchat-nodetesti.rahtiapp.fi/api/visio/", // Tarvitsee tämän kun viet rahti tuotantoon. Et voi viitata localhostiin
      "http://localhost:3000/api/visio/",
      { image_url: image_url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // return response.data;
    const materials = JSON.parse(response.data.message.content);
    return materials;
  } catch (error) {
    console.error("Virhe kuvan lähetyksessä:", error);
  }
}

