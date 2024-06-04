const express = require("express");
const bodyParser = require("body-parser");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const app = express();
const port = 3000;

// Initialize Generative AI
const apiKey = "AIzaSyAkCiAV3PE4cXdcW-lDDVis7jfSNYL_vjE";


// Get Generative Model

const genAI = new GoogleGenerativeAI(apiKey);

var store = {};

async function run(prompt) {
    if (store[prompt]) return store[prompt];

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    store[prompt] = text;
    return text;
}




app.get('/', (req, res) => {
    res.send('You are ON!');
});

app.get('/cq', async (req, res) => {

    const prompt = req.query.prompt;

    if (!prompt) {
        return res.status(400).send({ error: 'No prompt provided' });
    }

    try {
        const geminiResponse = await run(prompt);
        res.send(geminiResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while processing your request' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
