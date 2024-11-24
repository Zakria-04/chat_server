import axios from "axios";
import { Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

const getImagesFromCloudinary = async (req: Request, res: Response) => {
  const url = `https://api.cloudinary.com/v1_1/${cloud_name}/resources/image`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: api_key as string,
        password: api_secret as string,
      },
    });

    let urlArray = [];

    const images = response.data.resources;

    for (let i = 0; i < images.length; i++) {
      urlArray.push(images[i].url);
    }

    res.status(200).json(urlArray);
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

export { getImagesFromCloudinary };
