import { model, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import { IUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true ,},
    role: { type: String, enum: ['admin','user'], required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
userSchema.pre('save', async function () {
  //
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
});

//post save middleware /

userSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});


export const User = model<IUser>("User", userSchema);