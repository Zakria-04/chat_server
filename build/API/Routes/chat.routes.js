"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("../Controllers/chat.controller");
const chatRouter = (0, express_1.Router)();
chatRouter.post("/create_new_chat", chat_controller_1.createNewChat);
chatRouter.post("/get_user_chat", chat_controller_1.getUserChat);
exports.default = chatRouter;
