import mongoose, { Schema } from 'mongoose';

const RepoSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true, trim: true },
  full_name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  html_url: { type: String, required: true, trim: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  stargazers_count: { type: Number, default: 0 },
  forks_count: { type: Number, default: 0 },
  language: { type: String, default: null },
  topics: { type: [String], default: [] },
});

const ActivitySchema = new Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  repo: {
    name: { type: String, required: true },
    url: { type: String, required: true },
  },
  created_at: { type: Date, required: true },
});

const LanguageDataSchema = new Schema({
  language: String,
  count: Number,
  fill: String,
});

const GithubProfileSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    name: { type: String, default: '' },
    avatar_url: { type: String, default: '' },
    bio: { type: String, default: '' },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    public_repos: { type: Number, default: 0 },
    totalStars: { type: Number, default: 0 },
    created_at: { type: Date },
    html_url: { type: String, default: '' },
    repositories: { type: [RepoSchema], default: [] },
    recentActivities: { type: [ActivitySchema], default: [] },
    languages: { type: [LanguageDataSchema], default: [] },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const GithubProfile = mongoose.model(
  'GithubProfile',
  GithubProfileSchema
);
