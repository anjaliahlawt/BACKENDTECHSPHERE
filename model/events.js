
import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  location: { type: String },
  duration: { type: Number }, 
  prizePool: { type: Number }, 
  isFree: { type: Boolean, default: false }, 
  time: { type: Number }, 
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
