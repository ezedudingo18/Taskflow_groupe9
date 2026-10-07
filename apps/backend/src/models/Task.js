import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    status: { type: String, default: 'todo' },
    deadline: { type: Date },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_document, returnValue) => {
        delete returnValue.__v;
      },
    },
  },
);

export const Task = mongoose.model('Task', taskSchema);
