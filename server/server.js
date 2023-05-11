import express, { application } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();



const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

// initiate backend with express
const app = express();

// allow cross origin request and pass json from frontend to backend
app.use(cors()); 
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Modern Vet Solutions',
  })
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "davinci:ft-modern-vet-solutions-2023-05-11-18-39-35",
      prompt: `${prompt}`,
      temperature: 0.3,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })

    res.status(200).send({
      bot: response.data.choices[0].text
    })
  } catch(error) {
      console.log(error);
      res.status(500).send({ error })
  }
});

app.listen(8000, () => console.log('Server is running on http://localhost:8000')); 