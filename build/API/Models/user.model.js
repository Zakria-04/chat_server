"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_schema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    userPass: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: null,
    },
});
const USER_MODEL = (0, mongoose_1.model)("chat_user", user_schema);
exports.default = USER_MODEL;
