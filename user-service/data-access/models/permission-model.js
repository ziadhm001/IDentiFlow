import mongoose from 'mongoose';

const PermissionSchema = mongoose.Schema({
  user: mongoose.Types.ObjectId,
  brand: mongoose.Types.ObjectId,
  isAdmin: Boolean,
  createPermission: Boolean,
  editPermission: Boolean,
  deletePermission: Boolean,
});

export const Permission = mongoose.model('Permission', PermissionSchema);
