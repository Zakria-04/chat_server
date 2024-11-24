"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const Routes_1 = __importDefault(require("./API/Routes/Routes"));
const cors_1 = __importDefault(require("cors"));
require("./res/cloudinary");
dotenv.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/", Routes_1.default);
const dbURL = process.env.DB_URL;
//* error handling if the data base url is missing or wrong var name inside the .env file
//TODO => if you find this error you need to create .env file and add your mongoDB url inside DB_URL variable
if (!dbURL) {
    throw new Error("Missing DB_URL environment variable");
}
mongoose_1.default.connect(dbURL);
mongoose_1.default.connection.on("connected", () => {
    console.log("mongoose connected successfully!");
});
// handle mongodb connection error
mongoose_1.default.connection.on("error", () => {
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
exports.default = app;
