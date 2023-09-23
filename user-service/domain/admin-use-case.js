import * as userRepository from '../data-access/user-repository.js';
import {
  isAddUserDataValid,
  isGetUserDataValid,
  isUpdateUserDataValid,
  isDeleteUserDataValid,
  returnAddError,
  returnDeleteError,
  returnGetError,
  returnUpdateError,
} from './user-validators.js';

export async function addUser(userDetails) {
  const res = isAddUserDataValid(userDetails)
    ? await userRepository.addUser(userDetails)
    : returnAddError(userDetails);
  return res;
}

export async function getUser(userDetails) {
  const res = isGetUserDataValid(userDetails)
    ? await userRepository.getUser(userDetails)
    : returnGetError(userDetails);
  return res;
}

export async function getAllUsers() {
  const res = await userRepository.getAllUsers();
  return res;
}

export async function updateUser(userDetails) {
  const res = isUpdateUserDataValid(userDetails)
    ? await userRepository.updateUser(userDetails)
    : returnUpdateError(userDetails);
  return res;
}

export async function deleteUser(userDetails) {
  const res = isDeleteUserDataValid(userDetails)
    ? await userRepository.deleteUser(userDetails)
    : returnDeleteError(userDetails);
}
