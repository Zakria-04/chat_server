import CHAT_MODEL from "../Models/chat.model";
import { Request, Response } from "express";
import MESSAGE_MODEL from "../Models/message.model";

const createNewChat = async (req: Request, res: Response): Promise<void> => {
  const { chatID, participants } = req.body;
  try {
    const newChat = await CHAT_MODEL.create({
      chatID,
      participants,
    });

    res.status(200).json({ newChat });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ errorMessage });
  }
};

const getUserChat = async (req: Request, res: Response): Promise<void> => {
  const { chatID, senderID } = req.body;
  try {
    const findChat = await MESSAGE_MODEL.find({ chatID });

    res.status(200).json(findChat);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ errorMessage });
  }
};

export { createNewChat, getUserChat };
