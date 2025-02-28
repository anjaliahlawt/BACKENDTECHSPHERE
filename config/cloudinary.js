import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Storage setup for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "event_images", // Images will be stored in this Cloudinary folder
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

// Upload Middleware
const upload = multer({ storage });

export { cloudinary, upload };
