import * as customerRepository from '../data-access/customer-repository.js'
import { isAddCustomerDataValid, returnAddError } from './customer-validators.js';
import { verifyUsingOpenAI } from './helpers.js'
export async function addCustomer(customerDetails) {
    if (isAddCustomerDataValid(customerDetails)) {
      const customerData = await customerRepository.getCustomer(customerDetails);
      if(customerData.success === false)
        return customerData
      const customerVerifiedDetails = await verifyUsingOpenAI(customerDetails);
      return (await customerRepository.addCustomer(customerVerifiedDetails));
    }
    return returnAddError();
}


export async function getVerifiedCustomers() {
  const customersData = await customerRepository.getCustomers({isVerified: true});
  return customersData
}

export async function getVerifiedCustomersAnalytics() {
  const customersData = await customerRepository.getCustomersAnalytics({isVerified: true});
  return customersData
}