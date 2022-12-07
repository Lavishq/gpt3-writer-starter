import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Write me a short information based on scientific studies or information,as well as benefits and disadvantages (if any) with the following ingredients or ingredients present in the following components ps: if something is unrelated to health then reply with something like 'this is not related to food':`;

const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  // const secondPrompt = `Take the contents below and generate more informational content as first one
  // Title: ${req.body.userInput}
  // Table of Contents: ${basePromptOutput.text}
  // Answer:`

  // const secondPromptCompletion = await openai.createCompletion({
  //   model: 'text-davinci-003',
  //   prompt: `${secondPrompt}`,
  //   // I set a higher temperature for this one. Up to you!
  //   temperature: 0.8,
  // // I also increase max_tokens.
  //   max_tokens: 350,
  // });

  // const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  // res.status(200).json({ output: secondPromptOutput });

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
