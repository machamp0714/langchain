import { PromptTemplate, ChatPromptTemplate } from "@langchain/core/prompts";

const prompt = new PromptTemplate({
  template: "{product}はどこの会社が開発した商品ですか？",
  inputVariables: ["product"],
});

prompt.format({ product: "iPhone" }).then((response) => {
  console.log(response);
});

const template =
  "You are a helpful assistant that translates {input_language} to {output_language}.";
const humanTemplate = "{text}";

const chatPrompt = ChatPromptTemplate.fromMessages([
  ["system", template],
  ["human", humanTemplate],
]);

chatPrompt
  .formatMessages({
    input_language: "English",
    output_language: "Japanese",
    text: "I love programming.",
  })
  .then((response) => {
    console.log(response);
  });
