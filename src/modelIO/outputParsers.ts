import { CommaSeparatedListOutputParser } from "langchain/output_parsers";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

(async () => {
  const parser = new CommaSeparatedListOutputParser();
  const chatModel = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
  });

  const result = await chatModel.invoke([
    new HumanMessage("Appleが開発した代表的な製品を3つ教えてください"),
    new SystemMessage(parser.getFormatInstructions()),
  ]);
  console.log(parser.getFormatInstructions()); // Your response should be a list of comma separated values, eg: `foo, bar, baz`

  const output = await parser.parse(result.content as string);
  for (const item of output) {
    console.log(item);
  }
})();
