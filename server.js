const express = require("express");
const dotenv = require("dotenv");
const eventsRouter = require("./routers/events");
const notFound = require("./middlewares/notFound");
const serverError = require("./middlewares/serverError");


dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/events", eventsRouter);

app.use(serverError);

app.use(notFound);

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});