import OpenAI from 'openai'
import dotenv from "dotenv"
dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

export const verifyUsingOpenAI = async (customerDetails) => {
    const content =
    `
        You should answer that in a json format to be provided as an API response to an on going app, format { segment, country }
        if you don't know the segment set it to null
        
        What segment is this email out of these segments? or it doesn't match any?
        
        Segments are:
        Students
        Teachers
        Healthcare Workers
        Military
        First Responders
        
        Target mail:
        ${customerDetails.email}
    `

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content}],
        model: 'gpt-3.5-turbo',
      });
    
      return chatCompletion.choices
}