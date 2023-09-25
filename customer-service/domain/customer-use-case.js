import * as customerRepository from '../data-access/repositories/customer-repository.js'
import * as OTPRepository from '../data-access/repositories/otp-repository.js'

import { isAddCustomerDataValid, isVerficationDataValid, isResendOTPDataValid, returnAddError, returnResendOTPError, returnVerficationError } from './customer-usecase-validators.js';
import { validateUsingOpenAI, sendVerficationMail } from './helpers.js'


export async function addCustomer(customerData) {

    if (await isAddCustomerDataValid(customerData)) {
      const customerValidatedDetails = await validateUsingOpenAI(customerData);
      if(!customerValidatedDetails.isPersonalEmail)
        {
          const addCustomerResponse = await customerRepository.addCustomer(customerValidatedDetails)
          if(addCustomerResponse.success)
          {
            const { email } = addCustomerResponse.data
            const { otp } = (await OTPRepository.createOTP({email})).data
            await sendVerficationMail(email, otp)
          }
          return addCustomerResponse;
        }
    }

    return returnAddError(customerData);
}

export async function resendOTP(customerData) {
  if(isResendOTPDataValid(customerData))
  {
    const { email } = customerData
    const { otp } = (await OTPRepository.createOTP({email})).data
    await sendVerficationMail(email, otp)
    return {success: true, data: "Resent OTP"}
  }
  return returnResendOTPError(customerData)
}

export async function verifyEmail(customerData) {
  if(isVerficationDataValid(customerData))
  {
    const OTPVerficationResponse = await OTPRepository.verifyOTP(customerData);
    if(OTPVerficationResponse.success)
        return await customerRepository.verifyCustomer(customerData)
    else
      return OTPVerficationResponse
  }

  else
    return returnVerficationError(customerData);
}

export async function getVerifiedCustomers() {
  const customersData = await customerRepository.getCustomers({isVerified: true});
  return customersData
}

export async function getVerifiedCustomersAnalytics() {
  const customersData = await customerRepository.getCustomersAnalytics({isVerified: true});
  return customersData
}
