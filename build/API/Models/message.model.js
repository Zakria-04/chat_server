"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    chatID: {
        type: String,
        required: true,
    },
    senderID: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: String,
    },
    status: {
        type: String,
    },
    timeStamp: {
        type: String,
        default: new Date(),
    },
});
const MESSAGE_MODEL = (0, mongoose_1.model)("chat-message", messageSchema);
exports.default = MESSAGE_MODEL;
