import mongoose, { mongo, Schema } from 'mongoose';

const todoCategorySchema = new Schema(
  {
    name: {
      type: String,
      enum: ['work', 'personal', 'learning'],
      required: true,
    },
  },
  { timestamps: true }
);

export const TodoCategory = mongoose.model('TodoCategory', todoCategorySchema);
