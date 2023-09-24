export function isAddCustomerDataValid(customerDetails) {
    if(!customerDetails || !customerDetails.email || !customerDetails.firstName)
        return false
    return true
    
}



export function returnAddError(customerDetails) {
    if(!customerDetails || !customerDetails.email || !customerDetails.firstName)
        return {success: false, data: "Not enough data to create a record"}
}
