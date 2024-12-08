import MESSAGE_MODEL from "../Models/message.model";
import { Request, Response } from "express";
import USER_MODEL from "../Models/user.model";
import CHAT_MODEL from "../Models/chat.model";

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

const getUserMessages = async (chatID: any, userID: any, socket: any) => {
  if (!chatID || !userID) {
    // res.status(403).json({ error: "chatID and userID are required" });
    console.error("chatID and userID are required");
  }
  try {
    const user = await USER_MODEL.findById(userID);

    if (!user) {
      console.error("User not found");
      return;
    }

    const findChat = await MESSAGE_MODEL.find({ chatID });
    const findParticipants = await CHAT_MODEL.findOne({ chatID });

    if (!findChat || !findParticipants) {
      // res.status(404).json({ error: "Chat or participants not found!" });
      console.error("Chat or participants not found!");
      return;
    }

    const checkIfUserInChat = findParticipants?.participants.find(
      (id: string) => id === userID
    );

    if (!checkIfUserInChat) {
      console.error("User is not part of this chat");
      return;
    }

    console.log(findParticipants);

    socket.emit("user_message_response", findChat)


    // res.status(200).json({ findChat });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("error", errorMessage);
  }
};

export { createNewMessage, getUserMessages };
