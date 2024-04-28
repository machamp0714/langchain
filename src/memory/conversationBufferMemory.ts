import { OpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

const llm = new OpenAI();
const memory = new BufferMemory({ returnMessages: true });
const chain = new ConversationChain({ llm, memory });

(async () => {
  const res1 = await chain.call({ input: "Hi! I'm jim" });
  console.log(res1);

  const res2 = await chain.call({ input: "What's my name?" });
  console.log(res2);
})();
