const express = require("express");
const dotenv = require("dotenv");
const eventsRouter = require("./routers/events");

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/events", eventsRouter);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});