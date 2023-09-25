import { getRaw } from "../processors/otp-processor.js";
import { OTP } from "../models/otp-model.js";

export async function verifyOTP({email, otp}) {
  const verficationResponse = getRaw(await OTP.find({email}).sort({ createdAt: -1 }).limit(1));
  return verficationResponse?.otp === otp
    ? { success: true, data: "OTP is valid" }
    : { success: false, data: "Error with verifying record" };
}

export async function createOTP({email}) {
  const otp = (Math.floor(100000 + Math.random() * 900000)).toString();
  const creationResponse = getRaw(await OTP.create({email, otp}));
  return creationResponse
    ? { success: true, data: creationResponse }
    : { success: false, data: "Error with verifying record" };
}