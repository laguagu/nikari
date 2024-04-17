export async function getMaterials(image_url: string) {
  try {
    const response = await fetch("/api/visio/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_url: image_url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const materials = JSON.parse(data.message.content);
    return materials;
  } catch (error) {
    console.error("Virhe kuvan lähetyksessä:", error);
  }
}
