import OpenAI from 'openai'
import dotenv from "dotenv"
import nodemailer from 'nodemailer'
import { chatGPTMessageContent, verficationHTML } from '../constants.js';

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    port: "587",
    requireTLS: true,
})

export const validateUsingOpenAI = async (customerDetails) => {
    const content = chatGPTMessageContent(customerDetails.email)
    // TODO: SET RETURN FIELDS of FIRST & LAST NAMES, ALSO IS VERIFIED TO BE FALSE
    // - Remove the mock when api-key is available (test mode)
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content}],
        model: 'gpt-3.5-turbo',
    });
    
    //  return chatCompletion.choices
    return {
        firstName: "Ziad",
        lastName: "Hazem",
        country: "Egypt",
        segment: "Students",
        email: "minecraftziad7@gmail.com",
        isVerified: false,
        isPersonalEmail: false
    }
}

export const sendVerficationMail = async (email, otp) => {
    try {
      let info = await transporter.sendMail({
        from: 'www.checkpeas.com - Julie Canda',
        to: email,
        subject: 'Please verify your Checkpeas account',
        html: verficationHTML(otp),
        attachments: [
          {
            filename: 'checkpeas.png',
            path: 'checkpeas.png',
            cid: 'checkpeas'
          }
        ]
      });      
        console.log(info)
      } catch (error) {
        console.log(error.message);
      }
}
