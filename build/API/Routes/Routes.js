"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_routes_1 = __importDefault(require("./chat.routes"));
const images_routes_1 = __importDefault(require("./images.routes"));
const message_routes_1 = __importDefault(require("./message.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const Routes = [user_routes_1.default, images_routes_1.default, message_routes_1.default, chat_routes_1.default];
exports.default = Routes;
