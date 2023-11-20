const fs = require("fs");
const path = require("path");

const filePath = path.resolve(
    __dirname,
    "..",
    "db",
    "events.json"
  );

class Event {
id;
title;
description;
date;
maxSeats;

constructor (id, title, description, date, maxSeats){

    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.maxSeats = maxSeats;

}


static readEvents() {
    try {
      const eventsData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(eventsData);
    } catch (error) {
      // If the file doesn't exist or there's an error reading it, return an empty array
      return [];
    }
}

static writeEvents(events) {
try {
    fs.writeFileSync(filePath, JSON.stringify(events, null, 2), "utf8");
} catch (error) {
    console.error("Error writing events to file:", error);
}
}

static storeEvent(id, title, description, date, maxSeats) {

    const events = Event.readEvents();
    const newEvent = new Event(parseInt(id), title, description, date, parseInt(maxSeats));
    events.push(newEvent);
    Event.writeEvents(events);
}

static findEvent (id, res){

  const eventsArray = this.readEvents();
   // recupero l'id dalla richiesta
  const eventId = id;
  
  // recupero il post dalla lista dei posts
  const event = eventsArray.find((arrayEvent) => arrayEvent.id == eventId);
 
   // Nel caso in cui non sia stato trovato il post ritorno un 404
   if (!event) {
     res.status(404).send(`L'evento con id ${id} non è stato trovato`);
     return; // interrompo l'esecuzione della funzione
   }
 
   return event;

}

static findAllEvents () {

  const eventsArray = Event.readEvents();
  return eventsArray;

}

}

module.exports = {
  Event,
}