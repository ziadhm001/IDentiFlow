import * as userRepository from '../data-access/user-repository.js';
import * as permissionRepository from '../data-access/permission-repository.js'
import { User } from '../data-access/models/user-model.js';
import { Permission } from '../data-access/models/permission-model.js';
import { formatResponse } from '../helper.js';
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

export async function login(userDetails) {
  const user = await User.create(userDetails)
  return user
}

export async function register(userDetails) {
  try {
    const user = new User(userDetails)
    const res = await addUser(user);
    return res
  } catch(e) {
    return { success: false, data: 'already registered' }
  }
}

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
  return res;
}
