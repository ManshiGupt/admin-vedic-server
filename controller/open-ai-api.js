// import { OpenAI } from "openai";
// import dotenv from 'dotenv';

// dotenv.config();

// const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});


// export const generateAnswerOpenAI = async (req, res) => {

//     // Extract parameters from request body
//     const { prompt } = req.body;

//     try {

//         const response = await openai.chat.completions.create({

//             model: "gpt-3.5-turbo",  // or any other model you want to use
//             prompt: prompt,
//             max_tokens: 50,

//         });

//         console.log(response.data.choices[0].text);

//         res.json(response.data.choices[0].text);


//     } catch (error) {

//         res.status(500).send(error);
//         console.error("Error calling OpenAI API:", error);
//     }
// };


import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';


dotenv.config();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateAnswerGoogleAI = async (req, res) => {
    // Extract parameters from request body
    const { prompt } = req.body;

    // console.log('prompt data', prompt);

    try {
        // Set the maximum response length (tokens)
        const maxTokens = 50;

        const result = await model.generateContent(prompt, {
            max_tokens: maxTokens,
            // Optional: Fine-tune for brevity if needed
            // stop: [".", "?", "!"] // Example stop sequences
        });

        const response = result.response;
        const text = response.text();

        // console.log(text);

        res.json(text);


    } catch (error) {
        res.status(500).send(error);
        console.error("Error calling OpenAI API:", error);
    }
};