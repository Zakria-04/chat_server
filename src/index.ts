import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Routes from "./API/Routes/Routes";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", Routes);

const dbURL = process.env.DB_URL;

//* error handling if the data base url is missing or wrong var name inside the .env file
//TODO => if you find this error you need to create .env file and add your mongoDB url inside DB_URL variable
if (!dbURL) {
  throw new Error("Missing DB_URL environment variable");
}

mongoose.connect(dbURL);

mongoose.connection.on("connected", () => {
  console.log("mongoose connected successfully!");
});

// handle mongodb connection error
mongoose.connection.on("error", () => {
  console.error("mongoose connection error");
});

app.get("/live", (req, res) => {
  res.status(200).json({ status: "server is live!" });
});

export default app;
