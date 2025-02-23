import express from 'express';
import listeventcards from '../controller/eventcardController.js';
import getEvents from '../controller/eventFilterController.js';
const eventcardRouter=express.Router();
eventcardRouter.get('/',listeventcards); 
eventcardRouter.get('/filter',getEvents);  

export default eventcardRouter;