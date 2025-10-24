import { SqlDatabase } from "langchain/sql_db";
import { DataSource } from "typeorm";
import { ChatOpenAI } from "@langchain/openai";
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Annotation } from "@langchain/langgraph";
import { z } from "zod";
import { config } from "./../utils/config.js";
import { includeTables } from "../utils/includeTables.js";
import { tableInfos } from "./../utils/tableInfos.js";
import { QuerySqlTool } from "langchain/tools/sql";

const InputStateAnnotation = Annotation.Root({
  question: Annotation,
});

const StateAnnotation = Annotation.Root({
  question: Annotation,
  query: Annotation,
  result: Annotation,
  answer: Annotation,
});

const llm = new ChatOpenAI({
  apiKey: config.OPENAI_API_KEY,
  model: "gpt-4o-mini",
  temperature: 0
});

const queryPromptTemplate = await pull(
  "langchain-ai/sql-query-system-prompt"
);

// queryPromptTemplate.promptMessages.forEach((message) => {
//   console.log(message.lc_kwargs.prompt.template);
// });

// const datasource = new DataSource({
//   type: "sqlite",
//   database: "/Users/vincent/Documents/Web/ecommate/src/sample_data/Chinook.db",
// });
const datasource = new DataSource({
  type: "mysql",
//   socketPath: "/Users/vincent/Library/Application Support/Local/run/jWhQc-Yi5/mysql/mysqld.sock",
  username: "root",
  password: "root",
  database: "prestashop_17",
});

await datasource.initialize();
console.log("Datasource initialized");

const db = await SqlDatabase.fromDataSourceParams({
  appDataSource: datasource,
  includeTables: includeTables
});
console.log("DB ready");

//console.log("Fetching table info...");
const tables = await db.getTableInfo();
// console.log("Tables:", tables);


const queryOutput = z.object({
  query: z.string().describe("Syntactically valid SQL query."),
});

const structuredLlm = llm.withStructuredOutput(queryOutput);

// const question = "How many Employees are there?" ;
// const question = "List all products with their names" ;
// const question = "List all products with their names and unit prices, joining ps_product and ps_product_lang, for language id 1";
// const question = "List all products with their names and unit prices, joining ps_product and ps_product_lang, for language id 1";
// const question = "Find top 5 best seller products, with their name and price, joining ps_orders and ps_order_detail";
// const question = "Find the least purchased products";
// const question = "Find products that are never purchased";
// const question = "Find products that are never purchased, plus 5 least purchased products";
const question = "Find the top 5 customers, with the number of orders, and total amount spent";

const writeQuery = async (state) => {
  const promptValue = await queryPromptTemplate.invoke({
    dialect: db.appDataSourceOptions.type,
    top_k: 10,
    // table_info: await db.getTableInfo(),
    table_info: tableInfos.map(
      (t) => `${t.name}: ${t.description}`
    ).join("\n"),
    input: state.question,
  });
  const result = await structuredLlm.invoke(promptValue);
   // Si LLM ajoute LIMIT automatiquement, on peut le retirer :
  const queryWithoutLimit = result.query.replace(/LIMIT\s+\d+/i, "");
  return { query: queryWithoutLimit };
//   return { query: result.query };
};

const executeQuery = async (state) => {
  const executeQueryTool = new QuerySqlTool(db);
  return { result: await executeQueryTool.invoke(state.query) };
};

//const result = await db.run("SELECT * FROM Artist LIMIT 10;");

const _query = await writeQuery({ question: question });

const execresult = await executeQuery({
  question: "",
  query: _query.query,
  result: "",
  answer: "",
});



const generateAnswer = async (state) => {
  const promptValue =
    "Given the following user question, corresponding SQL query, " +
    "and SQL result, answer the user question.\n\n" +
    `Question: ${question}\n` +
    `SQL Query: ${_query.query}\n` +
    `SQL Result: ${execresult.result}\n`;
  const response = await llm.invoke(promptValue);
  return { answer: response.content };
};

const answer = await generateAnswer();
// console.log(result);
console.log(_query);
console.log(execresult);
console.log(answer);