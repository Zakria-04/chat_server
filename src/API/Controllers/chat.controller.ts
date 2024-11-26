import CHAT_MODEL from "../Models/chat.model";
import { Request, Response } from "express";
import MESSAGE_MODEL from "../Models/message.model";
import findUserByID from "../../res/utils";
import USER_MODEL from "../Models/user.model";

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
  const { chatID, userID } = req.body;
  if (!chatID || !userID) {
    res.status(403).json({ error: "chatID and userID are required" });
  }
  try {
    const user = await USER_MODEL.findById(userID);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const findChat = await MESSAGE_MODEL.find({ chatID });
    const findParticipants = await CHAT_MODEL.findOne({ chatID });

    if (!findChat || !findParticipants) {
      res.status(404).json({ error: "Chat or participants not found!" });
    }

    const checkIfUserInChat = findParticipants?.participants.find(
      (id: string) => id === userID
    );

    if (!checkIfUserInChat) {
      res.status(403).json({ error: "User is not part of this chat" });
    }

    res.status(200).json({ findChat });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ errorMessage });
  }
};

export { createNewChat, getUserChat };
