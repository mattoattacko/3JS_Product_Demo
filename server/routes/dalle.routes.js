//logic for interacting with the DALL.E API
import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";


//to use environment variables, we need to use the dotenv package
dotenv.config();

//for additional routes
const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

//use the config and merge it with our instance of the OpenAI API
const openai = new OpenAIApi(config);

//some routes
router.route('/').get ((req, res) => {
  res.status(200).json({ message: "hello from DALL.E Routes" });
});

//route to pass the prompt from the FE to the server
router.route('/').post(async (req,res) => {
  try {
    const { prompt } = req.body; //prompt coming from req.body

    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    })

    //once we get a response, we can get the image 
    const image = response.data.data[0].b64_json;

    //send the image back to the FE
    res.status(200).json({ photo: image });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong connecting to DALL.E. Check dalle.routes for more info"})
  }
})



//export the router
export default router;

//dont forget to connect this to index.js in the routes folder