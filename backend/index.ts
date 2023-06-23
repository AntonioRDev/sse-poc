import express from "express";
import cors from "cors";
import { faker } from "@faker-js/faker";

const server = express();
server.use(cors());

server.get("/", (req, res) => {
  res.send("ACK");
});

server.get("/streamNotifications", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Allow-Access-Control-Origin", "*");

  setInterval(() => {
    const notification = {
      message: faker.person.bio(),
      personName: faker.person.firstName(),
      personProfileImg: faker.image.avatar(),
      notificationTime: new Date(),
    };

    res.write("data: " + JSON.stringify(notification) + "\n\n");
  }, 3000);
});

server.listen(3950, () => {
  console.log("Server listening on port 3950");
});
