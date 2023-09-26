import { Permission } from './models/permission-model.js';
import { formatResponse } from '../helper.js';

export async function addPermission(permissionDetails) {
  const addingResponse = await Permission.create(permissionDetails);
  const formattedResponse = formatResponse(
    'Error with adding record',
    addingResponse
  );
  return formattedResponse;
}

export async function getPermission(permissionDetails) {
  const gettingResponse = await Permission.findOne(permissionDetails);
  const formattedResponse = formatResponse(
    'Error with getting record',
    gettingResponse
  );
  return formattedResponse;
}

export async function getPermission(permissionDetails) {
  const gettingResponse = await Permission.findOne(permissionDetails);
  const formattedResponse = formatResponse(
    'Error with getting record',
    gettingResponse
  );
  return formattedResponse;
}

export async function getPermissionByUserIdAndBrandId(userId, brandId) {
  const gettingResponse = await Permission.findOne({
    user: userId,
    brand: brandId,
  });
  const formattedResponse = formatResponse(
    'Error with getting record',
    gettingResponse
  );
  return formattedResponse;
}

export async function getAllPermissions() {
  const gettingResponse = await Permission.find();
  const formattedResponse = formatResponse(
    'Error with getting record',
    gettingResponse
  );
  return formattedResponse;
}

export async function updatePermission(permissionDetails) {
  const updatingResponse = await Permission.findOneAndUpdate(permissionDetails);
  const formattedResponse = formatResponse(
    'Error with updating record',
    updatingResponse
  );
  return formattedResponse;
}

export async function deletePermission(permissionDetails) {
  const deletingResponse = await Permission.findOneAndRemove(permissionDetails);
  const formattedResponse = formatResponse(
    'Error with deleting record',
    deletingResponse
  );
  return formattedResponse;
}
