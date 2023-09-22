import mongoose from 'mongoose';

const BrandSchema = mongoose.Schema({
  brandName: String,
});

export const Brand = mongoose.model('Brand', BrandSchema);
