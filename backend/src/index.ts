import express, { Express, Request, Response } from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import { connect } from "./db/connect";

dotenv.config();

const app: Express = express();
interface Message {
  role: "user" | "assistant";
  content: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


app.post("/api/chat", async (req, res) => {
  try {
    const { messages  } = req.body;
    console.log("Received messages:", messages);
    const completion = await openai.chat.completions.create({
      messages: messages.map((message: Message) => ({ role: message.role, content: message.content })),
      model: "gpt-3.5-turbo",
    });

    console.log("Generated response:", completion.choices[0].message.content);
    res.json({ response: completion.choices[0].message.content });
    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error("Someting went wrong:", (error as Error).message);
    res.status(500).json({ error: "Server API error" });
  }
});

app.get("/data", async (req: Request, res: Response) => {
  const db = await connect();
  if (!db) {
    res.status(500).send("Database connection failed");
    return;
  }
  const collection = db.collection("users");
  const data = await collection.find().toArray();
  res.send(data);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
