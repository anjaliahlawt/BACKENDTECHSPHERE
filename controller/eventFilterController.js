import EventCard from "../model/eventcardModel.js";

const getEvents = async (req, res) => {
  try {
    const {
      view,
      sortBy,
      price,
      isFree,
      duration,
      page = 1,
      size = 10,
    } = req.query;

    const filter = {};
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    console.log("Received query:", req.query);
    console.log("Today (UTC):", today);

    
    if (view === "upcoming") {
      filter.start = { $gte: today };
    } else if (view === "past") {
      filter.start = { $lt: today };
    } else if (view === "all") {
      filter.start = { $exists: true };
    }

    if (isFree === "true") {
      filter.prize = "Free";
    } else if (price) {
      filter.prize = price;
    }

    if (duration) {
      filter.duration = duration;
    }


    const totalEventsInDatabase = await EventCard.countDocuments({});

   
    const totalFilteredEvents = await EventCard.countDocuments(filter);

    
    let query = EventCard.find(filter);

    const sortFields = {
      date: { start: -1 },
      location: { location: 1 },
      duration: { duration: 1 },
      prize: { prize: 1 },
    };
    if (sortBy && sortFields[sortBy]) {
      query = query.sort(sortFields[sortBy]);
    } else {
      query = query.sort({ start: -1 });
    }

   
    const pageNumber = Number(page) || 1;
    const pageSize = Number(size) || 10;
    query = query.skip((pageNumber - 1) * pageSize).limit(pageSize);

    const events = await query.lean();

    res.json({
      events,
      totalEvents: totalEventsInDatabase, 
      totalFilteredEvents, 
      totalPages: Math.ceil(totalEventsInDatabase / pageSize), 
      currentPage: pageNumber,
      pageSize,
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export default getEvents;
