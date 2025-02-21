import EventCard from '../model/eventcardModel.js';

const listeventcards=async (req, res) => {
    try{
    // const {body}=req;
    const eventcardRes=await EventCard.find();
    res.status(200);
    // console.log(eventcardRes);
    // console.log(body);
    res.json({
        "status": 'success',
        "message": 'eventcard fetched',
        "data": eventcardRes

    });
    // console.log(res);
}


catch(err)
{
    res.status(500); //only possible when connection/server is down, so client no mistake   

    res.json({
        "status": 'fail',
        "message": `Internal Server Error`
    });
    

    // console.log("-----Error Occured",err);
}
}



export default listeventcards;