import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";

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
    new OpenAIEmbeddings()
  );

  const result = await store.similaritySearch("飛行車の最高速度は？");
  console.log(result.length);
  console.log(result.map((r) => r.pageContent));
})();
