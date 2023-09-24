import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    country: String,
    segment: String,
    isVerified: Boolean,
})

export const Customer = mongoose.model('Customer', CustomerSchema)