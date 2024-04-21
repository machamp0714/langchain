import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

const chatModel = new ChatOpenAI({
  temperature: 0,
});

const chatPrompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a nice chatbot having a conversation with a human."],
  new MessagesPlaceholder("chat_history"),
  ["human", "{question}"],
]);

const chatPromptMemory = new BufferMemory({
  memoryKey: "chat_history",
  returnMessages: true,
});

const chatConversationChain = new LLMChain({
  llm: chatModel,
  prompt: chatPrompt,
  verbose: true, // ログを出力する
  memory: chatPromptMemory,
});

(async () => {
  await chatConversationChain.invoke({ question: "What is your name?" });
  await chatConversationChain.invoke({ question: "What did I just ask you?" });
})();
