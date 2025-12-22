import { Schema, Model, model } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

const UserSchema = new Schema<UserInterface>({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["user", "admin"], default: 'user' },
  password: { type: String, required: true }
})

const User: Model<UserInterface> = model('User', UserSchema);

export { User }