const { Event } = require("../models/event");

function index(req,res){
  
  const { date, maxSeats } = req.query;


  const events = Event.findAllEvents();


  const filteredEvents = events.filter((event) => {
    if (date && event.date !== date) {
      return false;
    }
    if (maxSeats && event.maxSeats > parseInt(maxSeats, 10)) {
      return false;
    }
    return true;
  });

  res.json(filteredEvents);
}

function store(req, res) {
    const { id, title, description, date, maxSeats } = req.body;
  
    if (!id || !title || !description || !date || !maxSeats) {
      return res.status(400).json({ error: "Incomplete data for creating an event." });
    }
  
   
    const existingEvent = Event.findEvent(id, res);
    
    if (existingEvent) {
      return res.status(409).json({ error: "Event with the same ID already exists." });
    }
  
   
    Event.storeEvent(id, title, description, date, maxSeats);
  
    res.status(201).json({ message: "Event created successfully." });
  }
  
  function update(req, res) {
  const { title, description, date, maxSeats } = req.body;
  const id = parseInt(req.params.event);
  if (!id || !title || !description || !date || !maxSeats) {
    return res.status(400).json({ error: "Incomplete data for updating an event." });
  }

  
  const existingEvent = Event.findEvent(id);
  if (!existingEvent) {
    return res.status(404).json({ error: "Event not found." });
  }


  existingEvent.title = title;
  existingEvent.description = description;
  existingEvent.date = date;
  existingEvent.maxSeats = parseInt(maxSeats);

  console.log("existingEvent",existingEvent);


  try {
    
    const allEvents = Event.findAllEvents();
    console.log("allEvents",allEvents);
    console.log("id",id);
    const updatedEvents = allEvents.map(event => (event.id == id ? existingEvent : event));
    console.log("updatedEvents", updatedEvents);
    Event.writeEvents(updatedEvents);
    
    res.json({ message: "Event updated successfully." });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = {
    index,
    store,
    update
}