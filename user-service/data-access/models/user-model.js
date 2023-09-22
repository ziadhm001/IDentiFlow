import mongoose from 'mongoose';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

export const User = mongoose.model('User', UserSchema);
