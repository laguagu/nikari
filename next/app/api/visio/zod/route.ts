import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";

export const runtime = "edge";

const TEMPLATE = `Extract the requested fields from the input.

help me find the materials of the furniture in this image. If the image is not a furniture return a  all values false.

image:

{input}`;

/**
 * This handler initializes and calls an OpenAI Functions powered
 * structured output chain. See the docs for more information:
 *
 * https://js.langchain.com/docs/modules/chains/popular/structured_output
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const image = data.image_url;

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    const promptMessage = new HumanMessage({
      content: [
        { type: "text", text: TEMPLATE },
        {
          type: "image_url",
          image_url: {
            url: image,
            detail: "auto",
          },
        },
      ],
    });
    /**
     * Function calling is currently only supported with ChatOpenAI models
     */
    const model = new ChatOpenAI({
      temperature: 0.5,
      modelName: "gpt-4-turbo",
    });

    /**
     * We use Zod (https://zod.dev) to define our schema for convenience,
     * but you can pass JSON Schema directly if desired.
     */
    const MaterialSchema = z.object({
      wood: z.boolean(),
      metal: z.boolean(),
      leather: z.boolean(),
      laminate: z.boolean(),
      plastic: z.boolean(),
      fabric: z.boolean(),
      outdoorFurniture: z.boolean(),
    });

    /**
     * Bind the function and schema to the OpenAI model.
     * Future invocations of the returned model will always use these arguments.
     *
     * Specifying "function_call" ensures that the provided function will always
     * be called by the model.
     */
    const functionCallingModel = model.bind({
      functions: [
        {
          name: "output_formatter",
          description: "Should always be used to properly format output",
          parameters: zodToJsonSchema(MaterialSchema),
        },
      ],
      function_call: { name: "output_formatter" },
    });
    /**
     * Returns a chain with the function calling model.
     */
    const chain = prompt
      .pipe(functionCallingModel)
      .pipe(new JsonOutputFunctionsParser());

    const result = await chain.invoke({
      input: image,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
