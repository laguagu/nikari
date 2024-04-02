import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_LOCAL_URL ?? "";

const client = new MongoClient(uri);

export async function connect() {
  try {
    await client.connect();
    console.log("Connected to the database");
    return client.db("DemoDB");
  } catch (error) {
    console.error("Error connecting to the  database", error);
  }
}
