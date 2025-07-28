import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,


});

export default mongoose.models.Publication || mongoose.model("Publication", PublicationSchema);
