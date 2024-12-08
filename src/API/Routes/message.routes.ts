import { Router } from "express";
import {
  createNewMessage,
  getUserMessages,
} from "../Controllers/message.controller";

const messageRouter = Router();

messageRouter.post("/new_message", createNewMessage);
messageRouter.post("/get_messages", getUserMessages);

export default messageRouter;
