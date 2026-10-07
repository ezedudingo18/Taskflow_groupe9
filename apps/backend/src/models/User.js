import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    passwordHash: { type: String, select: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_document, returnValue) => {
        delete returnValue.passwordHash;
        delete returnValue.__v;
      },
    },
  },
);

export const User = mongoose.model('User', userSchema);
