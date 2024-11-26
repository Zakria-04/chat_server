"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../Controllers/message.controller");
const messageRouter = (0, express_1.Router)();
messageRouter.post("/new_message", message_controller_1.createNewMessage);
exports.default = messageRouter;
