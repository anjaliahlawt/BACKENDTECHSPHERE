import EventCard from '../model/eventcardModel.js';

const listeventcards=async (req, res) => {
    try{
    // const {body}=req;
    const eventcardRes=await EventCard.find();
    res.status(200);
  
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
const searchEvents = async (req, res) => {
  try {
      const { search } = req.query; // Get only the search query
      console.log("Searching for:", search);

      let query = {};

      // 🔹 Filter events by search input (name field)
      if (search && search.trim() !== "") {
          query.name = { $regex: search, $options: "i" }; // Case-insensitive search
      }

      console.log("Final MongoDB Query:", query);

      // 🔹 Fetch filtered events
      const events = await EventCard.find(query).limit(20);

      res.json(events);
  } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ message: "Server error" });
  }
};

export{listeventcards,searchEvents};