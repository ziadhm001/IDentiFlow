import mongoose from 'mongoose';
import User from '../data-access/models/user-model.js';
import { formatResponse } from '../helper.js';

export function isAddUserDataValid(userDetails) {
  const { _id, email, password } = userDetails;
  if (!email || !password) return false;
  if (!mongoose.Types.ObjectId.isValid(_id)) return false;
  return true;
}

export function isGetUserDataValid(userDetails) {
  const { _id } = userDetails;
  if (!mongoose.Types.ObjectId.isValid(_id)) return false;
  return true;
}

export async function isUpdateUserDataValid(userDetails) {
  const { _id } = userDetails;
  if (!_id || mongoose.Types.ObjectId.isValid(_id)) return false;
  const user = await User.findOne({ _id });
  if (!user) return false;
  return true;
}

export async function isDeleteUserDataValid(userDetails) {
  await isUpdateUserDataValid(userDetails);
}

export function returnAddError(userDetails) {
  const { _id, email, password } = userDetails;
  if (!email || !password)
    return formatResponse('Not enough data to create a record', false);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return formatResponse('Not a valid user id', false);
}

export function returnGetError(userDetails) {
  const { _id } = userDetails;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return formatResponse('Not a valid user id', false);
}

export async function returnUpdateError(userDetails) {
  if (!userDetails)
    return formatResponse('Not enough data to update a record', false);
  if (!userDetails._id) return formatResponse('Not a valid user id', false);
  const user = await User.findOne({ _id });
  if (!user) return formatResponse('No user matching the provided details');
}

export async function returnDeleteError(userDetails) {
  const { _id } = userDetails;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return formatResponse('Not a valid user id', false);
}
