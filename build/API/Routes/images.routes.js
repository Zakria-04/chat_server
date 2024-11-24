"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const images_controller_1 = require("../Controllers/images.controller");
const imagesRouter = (0, express_1.Router)();
imagesRouter.get("/get_profile_images", images_controller_1.getImagesFromCloudinary);
exports.default = imagesRouter;
