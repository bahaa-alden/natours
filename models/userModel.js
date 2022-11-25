import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
  },
});
const User = model('User', userSchema);

export default User;
