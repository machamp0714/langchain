import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const chatModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
});

const messages = [
  new SystemMessage(
    "あなたは親しい友人です。敬語は使わずフランクに話してください"
  ),
  new HumanMessage("こんにちは！"),
];

chatModel.invoke(messages).then((response) => {
  console.log(response);
});
