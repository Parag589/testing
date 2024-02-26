require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./src/routes/Routes";
import cors from "cors";
import "./src/db";
const http = require("http");
const socketIo = require("socket.io");
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initWebRoutes(app);

let server = http.createServer(app);
let io = socketIo(server);
io.on("connection", (socket) => {
  console.log("A client connected");

  // Optionally, you can handle events from the client
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
