require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./src/routes/Routes";
import cors from "cors";
import "./src/db";
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initWebRoutes(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
