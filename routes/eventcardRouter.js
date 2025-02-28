import express from 'express';
import { uploadImage } from "../controllers/uploadController.js";
import { upload } from "../cloudinaryConfig.js";
import listeventcards from '../controller/eventcardController.js';
import getEvents from '../controller/eventFilterController.js';
const eventcardRouter=express.Router();
eventcardRouter.get('/',listeventcards); 
eventcardRouter.post('/upload', upload.single("image"), uploadImage);
eventcardRouter.get('/filter',getEvents);  

export default eventcardRouter;