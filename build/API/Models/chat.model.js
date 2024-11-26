"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    chatID: {
        type: String,
        required: true,
        unique: true,
    },
    participants: {
        type: [String],
        required: true,
        default: [],
    },
});
const CHAT_MODEL = (0, mongoose_1.model)("user-chat", chatSchema);
exports.default = CHAT_MODEL;
