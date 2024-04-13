import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { DatetimeOutputParser } from "langchain/output_parsers";
import { HumanMessage } from "@langchain/core/messages";

(async () => {
  const chat = new ChatOpenAI();
  const parser = new DatetimeOutputParser();
  const prompt = PromptTemplate.fromTemplate("{product}のリリース日を教えて");
  const formattedPrompt = await prompt.format({ product: "iphone8" });

  const result = await chat.invoke([
    new HumanMessage(formattedPrompt),
    new HumanMessage(parser.getFormatInstructions()),
  ]);
  console.log(result.content);
})();
