const fs = require("fs");
const path = require("path");

const filePath = path.resolve(
    __dirname,
    "..",
    "db",
    "events.json"
  );

class Model {
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

    const events = Model.readEvents();
    const newEvent = new Model(id, title, description, date, maxSeats);
    events.push(newEvent);
    Model.writeEvents(events);
}
}