import mongoose from 'mongoose';
import { Permission } from '../data-access/models/permission-model.js';
import { formatResponse } from '../helper.js';

export function isAddPermissionDataValid(permissionDetails) {
  const {
    user,
    brand,
    isAdmin,
    createPermission,
    editPermission,
    deletePermission,
  } = permissionDetails;

  if (
    !mongoose.Types.ObjectId.isValid(user) ||
    !mongoose.Types.ObjectId.isValid(brand)
  )
    return false;
  if (
    typeof isAdmin !== 'boolean' ||
    typeof createPermission !== 'boolean' ||
    typeof editPermission !== 'boolean' ||
    typeof deletePermission !== 'boolean'
  )
    return false;
  return true;
}

export function isGetPermissionDataValid(permissionDetails) {
  const { _id } = permissionDetails;
  if (!mongoose.Types.ObjectId.isValid(_id)) return false;
  return true;
}

export function isGetPermissionByUserIdAndBrandIdDataValid(permissionDetails) {
  const { user, brand } = permissionDetails;
  if (
    !mongoose.Types.ObjectId.isValid(user) ||
    !mongoose.Types.ObjectId.isValid(brand)
  )
    return false;
  return true;
}

export async function isUpdatePermissionDataValid(permissionDetails) {
  const { _id } = permissionDetails;
  if (!_id || mongoose.Types.ObjectId.isValid(_id)) return false;
  const brand = await Permission.findOne({ _id });
  if (!brand) return false;
  return true;
}

export async function isDeletePermissionDataValid(permissionDetails) {
  await isUpdatePermissionDataValid(permissionDetails);
}

export function returnAddError(permissionDetails) {
  const {
    user,
    brand,
    isAdmin,
    createPermission,
    editPermission,
    deletePermission,
  } = permissionDetails;

  if (!mongoose.Types.ObjectId.isValid(user))
    return formatResponse('Not a valid user id', false);
  if (!mongoose.Types.ObjectId.isValid(brand))
    return formatResponse('Not a valid brand id', false);
  if (
    typeof isAdmin !== 'boolean' ||
    typeof createPermission !== 'boolean' ||
    typeof editPermission !== 'boolean' ||
    typeof deletePermission !== 'boolean'
  )
    return formatResponse('Not enough data to add a record', false);
}

export function returnGetError(permissionDetails) {
  const { _id } = permissionDetails;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return formatResponse('Not a valid permission id', false);
}

export function returnGetPermissionByUserIdAndBrandIdDataValid(
  permissionDetails
) {
  const { user, brand } = permissionDetails;
  if (!mongoose.Types.ObjectId.isValid(user))
    return formatResponse('Not a valid user id');
  if (!mongoose.Types.ObjectId.isValid(brand))
    return formatResponse('Not a valid brand id');
}

export async function returnUpdateError(permissionDetails) {
  if (!permissionDetails)
    return formatResponse('Not enough data to update a record', false);
  if (!permissionDetails._id)
    return formatResponse('Not a valid permission id', false);
  const permission = await Permission.findOne({ _id });
  if (!permission)
    return formatResponse('No permission matching the provided details');
}

export async function returnDeleteError(permissionDetails) {
  const { _id } = permissionDetails;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return formatResponse('Not a valid permission id', false);
}
