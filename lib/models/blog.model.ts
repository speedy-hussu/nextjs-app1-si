import mongoose, { Schema, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    // Store as plain string (e.g. "January 15, 2024") to keep things simple
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    readTime: {
      type: Number,
      required: true,
      default: 5,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Blog = models.Blog || mongoose.model("Blog", BlogSchema);



