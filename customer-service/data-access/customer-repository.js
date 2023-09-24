import { getRaw } from "./customer-processor.js";
import { Customer } from "./models/customer-model.js";

export async function addCustomer(customerDetails) {
    const addingResponse = getRaw(await Customer.create(customerDetails));
    return addingResponse
        ? { success: true, data: addingResponse }
        : { success: false, data: "Error with adding record" };
  }

export async function getCustomer(customerDetails) {
    const gettingResponse = getRaw(await Customer.findOne(customerDetails));
    return gettingResponse 
        ? {success: true, data: gettingResponse}
        : {success: false, data: "Error with getting record"}
}

export async function getCustomers(filter) {
  const gettingResponse = getRaw(await Customer.find(filter));
  return gettingResponse 
      ? {success: true, data: gettingResponse}
      : {success: false, data: "Error with getting record"}
}

export async function updateCustomer(customerDetails) {
    const { _id } = customerDetails;
    const updatingResponse = getRaw(await Customer.findOneAndUpdate({ _id }, customerDetails, { new: true }));
    return updatingResponse
      ? { success: true, data: updatingResponse }
      : { success: false, data: "Error with updating record" };
  }

  export async function deleteCustomer(customerDetails) {
    const deletingResponse = getRaw(await Customer.findOneAndRemove(customerDetails));
    return deletingResponse
      ? { success: true, data: deletingResponse }
      : { success: false, data: "Error with deleting record" };
  }