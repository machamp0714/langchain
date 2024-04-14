import "cheerio";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { pull } from "langchain/hub";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { RetrievalQAChain } from "langchain/chains";

(async () => {
  const loader = new CheerioWebBaseLoader(
    "https://lilianweng.github.io/posts/2023-06-23-agent/"
  );

  const docs = await loader.load();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
  });
  const splits = await splitter.createDocuments(
    docs.map((doc) => doc.pageContent)
  );
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  );

  const retriever = vectorStore.asRetriever();
  const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");
  const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });

  const ragChain = await RetrievalQAChain.fromLLM(llm, retriever, {
    returnSourceDocuments: true,
  });

  const retrievedDocs = await retriever.getRelevantDocuments(
    "what is task decomposition"
  );

  const result = await ragChain.call({
    query: "what is task decomposition?",
  });

  console.log(result["text"]);
  console.log(result["sourceDocuments"]);
})();
