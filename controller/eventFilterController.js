import EventCard from '../model/eventcardModel.js';

const getEvents = async (req, res) => {
  try {
    const { view, sortBy, price, isFree, duration, page = 1, size = 10 } = req.query;

    let filter = {};

    if (view === "upcoming" || view === "past") {
      filter.start = { $exists: true };
    }

    if (price) {
      filter.prize = price;
    }

    if (isFree === "true") {
      filter.prize = "Free";
    }

    if (duration) {
      filter.duration = duration;
    }

    // 🔹 Use MongoDB for filtering and sorting
    let query = EventCard.find(filter);

    const sortFields = { date: "start", location: "location", duration: "duration", prize: "prize" };
    if (sortBy) {
      query = query.sort(sortFields[sortBy] || "start");
    }

    // 🔹 Pagination using MongoDB
    query = query.skip((page - 1) * size).limit(Number(size));

    const events = await query.lean();

    res.json(events);
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}; export default getEvents;