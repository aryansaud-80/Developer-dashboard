import mongoose, { Schema } from 'mongoose';

const snippetSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    code: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Snippet = mongoose.model('Snippet', snippetSchema);
