import OpenAI from "openai";

const openai = new OpenAI();

// https://platform.openai.com/docs/api-reference/completions
openai.completions
  .create({
    model: "gpt-3.5-turbo-instruct",
    prompt: "今日の天気がとても良くて、気分が",
    // stop: "。",
    max_tokens: 100,
    n: 2,
    temperature: 1,
  })
  .then((response) => {
    console.log(response.choices);
  });
