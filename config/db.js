import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const dbUrl = process.env.MONGO_URI;

mongoose.connect(dbUrl,{
  dbName:'Techsphere-backend',

})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));