import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What’s in this image?" },
          {
            type: "image_url",
            image_url: {
              url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
              // "detail": "auto",
            },
          },
        ],
      },
    ],
  });

  return Response.json({ message: response.choices[0] });
}

// Esimerkki palautusarvosta (response.choices[0]
// {
//     "message": {
//       "index": 0,
//       "message": {
//         "role": "assistant",
//         "content": "The image shows a wooden boardwalk path extending through a lush green field or wetland area. The grass on either side of the path is tall and vibrant. In the background, there's a line of trees and bushes, and above that, a beautiful blue sky with soft, fluffy clouds scattered throughout. The setting looks peaceful and is likely a natural reserve or park, providing a walkway for visitors to enjoy the scenery without disturbing the natural habitat."
//       },
//       "logprobs": null,
//       "finish_reason": "stop"
//     }
//   }