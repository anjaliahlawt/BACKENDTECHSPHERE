import mongoose from 'mongoose';
const eventcardSchema = new mongoose.Schema(
  {
    location: String,
    name: String,
    description: String,
    start: { type: Date }, 
    duration: String,
    prize: String,
    imageBg: String,
    imageUrl:String,
  },
  {
    timestamps: true,
  }
);

const EventCard = mongoose.model("eventcards", eventcardSchema);
export default EventCard;
