import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  const image = data.image_url;
  if (!image) {
    return Response.json({
      message: "Cant find image in req.body",
      status: 400,
    });
  }

  // const response = await openai.chat.completions.create({
  //   model: "gpt-4-turbo",
  //   messages: [
  //     {
  //       role: "user",
  //       content: [
  //         {
  //           type: "text",
  //           text: "Can you help me find the materials of the furniture in this image? If the image is not a furniture return a JSON with all values false. Fill this JSON -object and return it only (as JSON parseable): { wood: false, metal: false, leather: false, laminate: false, plastic: false, fabric: false, outdoorFurniture: false }",
  //         },
  //         {
  //           type: "image_url",
  //           image_url: {
  //             url: image,
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   response_format: { type: "json_object" },
  // });
  return Response.json({
    index: 0,
    message: {
      role: "assistant",
      content:
        '{ "wood": true, "metal": false, "leather": false, "laminate": false, "plastic": false, "fabric": false, "outdoorFurniture": false }',
    },
    logprobs: null,
    finish_reason: "stop",
  });
  // return Response.json(response.choices[0]);
}
