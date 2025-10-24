import { pool } from "../db/pool.js";
import { OpenAI } from "@langchain/openai";
import { SQLDatabase } from "@langchain/sql_db";
import { SQLDatabaseChain } from "langchain/chains/sql_db";

export const askQuestion = async (question) => {
  const llm = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, modelName: "gpt-4-turbo" });
  const db = await SQLDatabase.fromPool(pool);
  const chain = new SQLDatabaseChain({ llm, database: db, verbose: true });
  const result = await chain.call({ query: question });
  return result;
};
