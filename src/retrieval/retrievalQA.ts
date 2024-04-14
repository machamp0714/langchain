import "cheerio";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
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

  const retriever = vectorStore.asRetriever(); // vector store から retriever を作成
  const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });

  const chain = await RetrievalQAChain.fromLLM(llm, retriever, {
    returnSourceDocuments: true,
  });

  const retrievedDocs = await retriever.getRelevantDocuments(
    "what is task decomposition"
  );
  console.log(retrievedDocs);

  // RetrievalQAを実行する
  const result = await chain.invoke({
    query: "what is task decomposition?",
  });

  console.log(result["text"]);
  console.log(result["sourceDocuments"]);
})();
