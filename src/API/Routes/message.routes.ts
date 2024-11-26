import { Router } from "express";
import { createNewMessage } from "../Controllers/message.controller";

const messageRouter = Router();

messageRouter.post("/new_message", createNewMessage);

export default messageRouter;
