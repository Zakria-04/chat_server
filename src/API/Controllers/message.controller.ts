import MESSAGE_MODEL from "../Models/message.model";
import { Request, Response } from "express";

const createNewMessage = async (req: Request, res: Response) => {
  const { senderID, chatID, message, status, timeStamp } = req.body;
  try {
    const newMsg = await MESSAGE_MODEL.create({
      chatID,
      senderID,
      message,
      status,
      timeStamp,
    });
    res.status(200).json(newMsg);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
};

export { createNewMessage };
