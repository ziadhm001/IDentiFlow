import mongoose from 'mongoose';
import { Brand } from '../data-access/models/brand-model.js';
import { formatResponse } from '../helper.js';

export function isAddBrandDataValid(brandDetails) {
  const { brandName } = brandDetails;
  if (brandName?.length < 3) return false
  return true
}

export function isGetBrandDataValid(brandDetails) {
  const { _id } = brandDetails;
  if (!mongoose.Types.ObjectId.isValid(_id)) return false;
  return true;
}

export async function isUpdateBrandDataValid(brandDetails) {
  const { _id } = brandDetails;
  if (!_id || mongoose.Types.ObjectId.isValid(_id)) return false;
  const brand = await Brand.findOne({ _id });
  if (!brand) return false;
  return true;
}

export async function isDeleteBrandDataValid(brandDetails) {
    await isUpdateBrandDataValid(brandDetails);
}


export function returnAddError(brandDetails) {
  const { brandName } = brandDetails;
  if (brandName?.length < 3)
    return formatResponse('Not enough data to create a record', false);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return formatResponse('Not a valid brand id', false);
}

export function returnGetError(brandDetails) {
  const { _id } = brandDetails;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return formatResponse('Not a valid brand id', false);
}

export async function returnUpdateError(brandDetails) {
  if (!brandDetails)
    return formatResponse('Not enough data to update a record', false);
  if (!brandDetails._id) return formatResponse('Not a valid brand id', false);
  const brand = await Brand.findOne({ _id });
  if (!brand) return formatResponse('No brand matching the provided details');
}

export async function returnDeleteError(brandDetails) {
  const { _id } = brandDetails;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return formatResponse('Not a valid brand id', false);
}

