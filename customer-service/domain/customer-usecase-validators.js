import * as customerRepository from '../data-access/repositories/customer-repository.js'

export async function isAddCustomerDataValid(customerData) {
    if(!customerData || !customerData.email || !customerData.firstName)
        return false
    else if((await customerRepository.getCustomer(customerData)).success)
        return false
    return true
}

export function isVerficationDataValid(customerData) {
    if(!customerData || !customerData.email || !customerData.otp)
        return false
    return true
}

export function isResendOTPDataValid(customerData) {
    if(!customerData || !customerData.email)
        return false
    return true
}

export function returnAddError(customerData) {
    if(!customerData || !customerData.email || !customerData.firstName)
        return {success: false, data: "Not enough data to create a record"}
    else
        return {success: false, data: "Email exists"}
}

export function returnVerficationError(customerData) {
    if(!customerData || !customerData.email || !customerData.otp)
        return {success: false, data: "Not enough data to verify the record"}
    return {success: false, data: "Error with verfication"}
}

export function returnResendOTPError(customerData) {
    if(!customerData || !customerData.email)
        return {success: false, data: "Email is required"}
    return {success: false, data: "Error with resending"}
}