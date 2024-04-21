import { BufferMemory } from "langchain/memory";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

const memory = new BufferMemory({
  returnMessages: true,
});

(async () => {
  await memory.chatHistory.addMessage(new HumanMessage("Hi!"));
  await memory.chatHistory.addMessage(new AIMessage("What's up?"));

  console.log(await memory.loadMemoryVariables({}));
})();
