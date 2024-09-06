export async function getMaterials(image_url: string) {
  const response = await fetch("/api/visio/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image_url: image_url }),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    if (
      response.status === 400 &&
      errorResponse.error &&
      errorResponse.error.code === "content_policy_violation"
    ) {
      throw new Error(
        "Your input image may contain content that is not allowed by AI safety system",
      );
    } else {
      throw new Error(
        errorResponse.error.message ||
          `HTTP-virhe! Tilakoodi: ${response.status}`,
      );
    }
  }

  const data = await response.json();
  const materials = JSON.parse(data.message.content);

  return materials;
}
