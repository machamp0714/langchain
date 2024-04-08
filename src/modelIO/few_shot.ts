import {
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";

import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({});
const examples = [
  {
    input: "Could the members of The Police perform lawful arrests?",
    output: "what can the members of The Police do?",
  },
  {
    input: "Jan Sindel's was born in what country?",
    output: "what is Jan Sindel's personal history?",
  },
];
const examplePrompt = ChatPromptTemplate.fromTemplate(
  `Human: {input}\nAI: {output}`
);

const fewShotPrompt = new FewShotChatMessagePromptTemplate({
  prefix:
    "Rephrase the users query to be more general, using the following examples", // 例を出力するプロンプトの前に置かれるテキスト
  suffix: "Human: {input}", // 例を出力するプロンプトの後に置かれるテキスト
  examplePrompt,
  examples,
  inputVariables: ["input"],
});

(async () => {
  const formattedPrompt = await fewShotPrompt.format({
    input: "What's France's main city?",
  });
  console.log(formattedPrompt);

  const response = await model.invoke(formattedPrompt);
  console.log(response.content);
})();
