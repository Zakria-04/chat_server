"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserChat = exports.createNewChat = void 0;
const chat_model_1 = __importDefault(require("../Models/chat.model"));
const message_model_1 = __importDefault(require("../Models/message.model"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const createNewChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatID, participants } = req.body;
    try {
        const newChat = yield chat_model_1.default.create({
            chatID,
            participants,
        });
        res.status(200).json({ newChat });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ errorMessage });
    }
});
exports.createNewChat = createNewChat;
const getUserChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatID, userID } = req.body;
    if (!chatID || !userID) {
        res.status(403).json({ error: "chatID and userID are required" });
    }
    try {
        const user = yield user_model_1.default.findById(userID);
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const findChat = yield message_model_1.default.find({ chatID });
        const findParticipants = yield chat_model_1.default.findOne({ chatID });
        if (!findChat || !findParticipants) {
            res.status(404).json({ error: "Chat or participants not found!" });
        }
        const checkIfUserInChat = findParticipants === null || findParticipants === void 0 ? void 0 : findParticipants.participants.find((id) => id === userID);
        if (!checkIfUserInChat) {
            res.status(403).json({ error: "User is not part of this chat" });
        }
        res.status(200).json({ findChat });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ errorMessage });
    }
});
exports.getUserChat = getUserChat;
