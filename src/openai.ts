import OpenAI from "openai";

const openai = new OpenAI();

openai.chat.completions
  .create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "そばの原材料を教えて",
      },
    ],
    max_tokens: 100,
    temperature: 1,
    n: 2,
  })
  .then((response) => {
    console.log(response.choices);
  });
