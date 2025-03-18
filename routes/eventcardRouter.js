import express from 'express';
import {listeventcards, searchEvents}from '../controller/eventcardController.js';
import getEvents from '../controller/eventFilterController.js';

const eventcardRouter=express.Router();
eventcardRouter.get('/',listeventcards); 
eventcardRouter.get('/filter',getEvents);  
eventcardRouter.get('/search',searchEvents);

export default eventcardRouter;