import mongoose from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model('Category', categorySchema);
