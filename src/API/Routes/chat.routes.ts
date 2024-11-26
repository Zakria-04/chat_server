import { Router } from "express";
import { createNewChat, getUserChat } from "../Controllers/chat.controller";

const chatRouter = Router();

chatRouter.post("/create_new_chat", createNewChat);
chatRouter.post("/get_user_chat", getUserChat);

export default chatRouter;
