import mongoose, { Schema } from "mongoose";

const pomodoroHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessionType: {
      type: String,
      enum: ["work", "shortBreak", "longBreak"],
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const PomodoroHistory = mongoose.model(
  "PomodoroHistory",
  pomodoroHistorySchema
);
