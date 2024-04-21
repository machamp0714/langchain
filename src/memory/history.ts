import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";

const history = new ChatMessageHistory();

(async () => {
  await history.addMessage(new HumanMessage("Hi!"));
  await history.addMessage(new AIMessage("What's up?"));

  console.log(await history.getMessages());
})();
