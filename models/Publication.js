import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true, // Cloudinary PDF URL
  },
  cloudinaryId: {
    type: String, // ⬅️ Store Cloudinary public_id for deletion
    required: true,
  },
}, {
  timestamps: true, // Optional: adds createdAt & updatedAt fields
});

export default mongoose.models.Publication || mongoose.model("Publication", PublicationSchema);
