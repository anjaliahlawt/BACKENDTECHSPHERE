import Event from "../models/eventModel.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const { name, description, location, start, duration, prize } = req.body;
    const imageUrl = req.file.path; // Get Cloudinary image URL

    const newEvent = new Event({
      name,
      description,
      location,
      start,
      duration,
      prize,
      imageBg,
      imageUrl, // Save image URL to database
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created successfully", newEvent });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
