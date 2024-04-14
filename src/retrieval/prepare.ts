import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";

const loader = new PDFLoader("src/retrieval/asset/sample.pdf");

(async () => {
  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
  });
  const output = await splitter.createDocuments(
    docs.map((doc) => doc.pageContent)
  );

  const store = await MemoryVectorStore.fromDocuments(
    output,
    new OpenAIEmbeddings() // embeddings はベクトル化するためのインターフェースを持っている
  );

  const query = "飛行車の最高速度は？";
  const documents = await store.similaritySearch(query);

  let document = "";
  for (const doc of documents) {
    document += doc.pageContent;
  }

  const prompt = new PromptTemplate({
    template: `
      文章を元に、以下の質問に答えてください。

      文章:
      {document}

      質問: {query}
    `,
    inputVariables: ["document", "query"],
  });

  const chat = new ChatOpenAI();

  const result = await chat.invoke([
    new HumanMessage(await prompt.format({ document, query })),
  ]);

  console.log(result.content);
})();
