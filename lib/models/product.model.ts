import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["rice", "wheat", "spices", "pulses"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    specifications: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in Next.js
export const Product =
  models.Product || mongoose.model("Product", ProductSchema);
