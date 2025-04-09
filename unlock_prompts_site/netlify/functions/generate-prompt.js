const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  const { idea } = JSON.parse(event.body || '{}');

  const basePrompt = `
You're the most advanced prompt engineer on the planet. You create image prompts that unlock the full generative power of AI image models. Based on the idea below, create the most vivid, powerful, and specific image generation prompt possible. Include detail, lighting, emotion, style, realism, and context. Do NOT include camera settings or art jargon unless relevant to the scene.

Idea: ${idea}

Elite Prompt:
`;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: basePrompt,
    temperature: 0.9,
    max_tokens: 500,
  });

  const prompt = response.data.choices[0].text.trim();

  return {
    statusCode: 200,
    body: JSON.stringify({ prompt }),
  };
};
