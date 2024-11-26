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
const index_1 = __importDefault(require("./index"));
const http_1 = __importDefault(require("http"));
const dotenv = __importStar(require("dotenv"));
const socket_io_1 = require("socket.io");
const user_controller_1 = require("./API/Controllers/user.controller");
dotenv.config();
const port = process.env.PORT || 8080;
const server = http_1.default.createServer(index_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: [
            "https://chat-3pkb0k0pa-zakria-04s-projects.vercel.app",
            "http://localhost:3000",
        ],
        methods: ["GET", "POST", "PATCH"],
    },
});
io.on("connection", (socket) => {
    console.log(socket.connected);
    // check if user is active
    socket.on("active", (id) => __awaiter(void 0, void 0, void 0, function* () {
        // created a new key with the value of _id
        console.log("socket id", id);
        socket.userId = id;
        try {
            // change user status based on connection
            yield (0, user_controller_1.checkIfUserIsActive)(id, "online");
        }
        catch (error) {
            console.error("Error updating active status:", error);
        }
    }));
    // update user status
    socket.on("status-change", (id, status) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("status change", status);
        try {
            yield (0, user_controller_1.updateUserStatus)(id, status);
        }
        catch (error) {
            console.error("Error updating active status:", error);
        }
    }));
    // check if user has disconnected from the server
    socket.on("disconnect", (response) => __awaiter(void 0, void 0, void 0, function* () {
        if (socket.userId) {
            try {
                // change user status based on connection
                yield (0, user_controller_1.checkIfUserIsActive)(socket.userId, "offline");
            }
            catch (error) {
                console.error("Error updating active status:", error);
            }
        }
    }));
});
server.listen(port, (err) => {
    if (err)
        throw new Error(err);
    console.log(`server is running on port ${port}\nwaiting for mongoose connection...`);
});
