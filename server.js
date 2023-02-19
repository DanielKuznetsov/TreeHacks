const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(config);

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async (req, res) => {
//   console.log(req.body);
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: prompt,
  });

  res.send(completion.data.choices[0].text);
});

const port = 4000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}!`);
});
