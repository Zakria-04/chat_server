import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Routes from "./API/Routes/Routes";
import cors from "cors";

import "./res/cloudinary";
import axios from "axios";
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

// const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
// const api_key = process.env.CLOUDINARY_API_KEY;
// const api_secret = process.env.CLOUDINARY_API_SECRET;

// const fetchImages = async () => {
//   const url = `https://api.cloudinary.com/v1_1/${cloud_name}/resources/image`;

//   try {
//     const response = await axios.get(url, {
//       auth: {
//         username: api_key as string,
//         password: api_secret as string,
//       },
//     });

//     const images = response.data.resources;
//     console.log("url: ", images[0].url);
//     return images; // Array of image objects
//   } catch (error) {
//     console.error("Error fetching images:", error);
//   }
// };

// fetchImages();

export default app;
