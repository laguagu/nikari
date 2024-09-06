import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  try {
    const data = await req.json();
    const image = data.image_url;

    if (!image) {
      return Response.json({
        message: "Cant find image in req.body",
        status: 400,
      });
    }
    // return Response.json({
    //   index: 0,
    //   message: {
    //     role: "assistant",
    //     content:
    //       '{ "wood": true, "leather": true, "metal": true, "laminate": false, "plastic": false, "fabric": false }',
    //   },
    //   logprobs: null,
    //   finish_reason: "stop",
    // });
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze the image provided. If the image contains furniture, identify the materials present and specify whether each material is present as true or false. Use the following JSON format for your response: { wood: false, leather: false, metal: false, laminate: false, plastic: false, fabric: false }. If no furniture is visible in the image, return the JSON object with all values set to false.",
            },
            {
              type: "image_url",
              image_url: {
                url: image,
                detail: "auto",
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    return Response.json(response.choices[0]);
  } catch (error) {
    console.error("Error in POST /api/visio/", error);
    return Response.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
