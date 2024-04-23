export async function getMaterials(image_url: string) {
  const response = await fetch("/api/visio/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image_url: image_url }),
  });

  if (!response.ok) {
    console.log("Ei ollut ok", response);

    const errorResponse = await response.json();
    throw new Error(
      errorResponse.error.message || `HTTP error! status: ${response.status}`
    );
  }

  const data = await response.json();
  const materials = JSON.parse(data.message.content);

  return materials;
}
