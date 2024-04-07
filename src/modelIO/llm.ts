import { OpenAI } from "@langchain/openai";

const llm = new OpenAI({
  modelName: "gpt-3.5-turbo-instruct",
  cache: true,
});

(async () => {
  console.time();
  const res = await llm.invoke("Tell me a long joke");
  console.log(res);
  console.timeEnd();

  console.time();
  const res2 = await llm.invoke("Tell me a joke");
  console.log(res2);
  console.timeEnd();
})();
