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
    const { chatID, senderID } = req.body;
    try {
        const findChat = yield message_model_1.default.find({ chatID });
        res.status(200).json(findChat);
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        res.status(500).json({ errorMessage });
    }
});
exports.getUserChat = getUserChat;