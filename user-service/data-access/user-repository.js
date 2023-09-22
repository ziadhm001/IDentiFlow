import { User } from './models/user-model';
import { formatResponse } from '../helper';

export async function addUser(userDetails) {
  const addingResponse = await User.create(userDetails);
  const formattedResponse = formatResponse(
    'Error with adding record',
    addingResponse
  );
  return formattedResponse;
}

export async function getUser(userDetails) {
  const gettingResponse = await User.findOne(userDetails);
  const formattedResponse = formatResponse(
    'Error with getting record',
    gettingResponse
  );
  return formattedResponse;
}

export async function getAllUsers() {
  const gettingResponse = await User.find();
  const formattedResponse = formatResponse(
    'Error with getting record',
    gettingResponse
  );
  return formattedResponse;
}

export async function updateUser(userDetails) {
  const updatingResponse = await User.findOneAndUpdate(userDetails);
  const formattedResponse = formatResponse(
    'Error with updating record',
    updatingResponse
  );
  return formattedResponse;
}

export async function deleteUser(userDetails) {
  const deletingResponse = await User.findOneAndRemove(userDetails);
  const formattedResponse = formatResponse(
    'Error with deleting record',
    deletingResponse
  );
  return formattedResponse;
}
