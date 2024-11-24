import { Router } from "express";
import { getImagesFromCloudinary } from "../Controllers/images.controller";

const imagesRouter = Router();

imagesRouter.get("/get_profile_images", getImagesFromCloudinary);

export default imagesRouter;
