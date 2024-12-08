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

    console.log(findParticipants);

    res.status(200).json({ findChat });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ errorMessage });
  }
};

const findParticipants = async (userID: string, socket: any) => {
  // const getParticipants = await CHAT_MODEL.findOne({ chatID });

  // if (!getParticipants) {
  //   console.error("Participant is not found");
  //   return;
  // }

  // const user = await USER_MODEL.findById(userID);

  // if (!user) {
  //   console.error("user not found!");
  //   return;
  // }

  // let getUserBasedOnID = getParticipants.participants;

  // const findUser = getUserBasedOnID.find((user) => user === userID);

  // if (findUser !== userID) {
  //   console.error("user is not found in the chat");
  //   return;
  // }

  const getChatBasedOnChatID = await CHAT_MODEL.find({ participants: userID });
  console.log("user must", getChatBasedOnChatID);

  let userChat = [];

  for (let i = 0; i < getChatBasedOnChatID.length; i++) {
    const getUserChat = getChatBasedOnChatID[i];
    const filterUserChat = getUserChat.participants.filter(
      (user) => user !== userID
    );

    const getUserBasedOnID = await USER_MODEL.findById(filterUserChat);

    if (getUserChat.participants.length <= 2) {
      getUserChat.chatProfile = getUserBasedOnID?.profileImg;
      getUserChat.chatName = getUserBasedOnID?.userName;
      userChat.push(getUserChat);
    } else {
      getUserChat.chatProfile =
        "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1733690400/profile-avatars/cqh8vqkmyxskojy2s95h.png";
      getUserChat.chatName = "group chat";
      userChat.push(getUserChat);
      await getUserChat.save();
    }
  }

  // console.log("user chat", userChat);

  socket.emit("user_chat_response", userChat);

  // const findChatUser = await USER_MODEL.findById({})

  // let userChat = [];

  // for (let i = 0; i < getChatBasedOnID.length; i++) {
  //   const getUserChat = getChatBasedOnID[i];
  //   const findUserInChat = getUserChat.participants.find(
  //     (user) => user === userID
  //   );

  //   if (findUserInChat) {
  //     userChat.push(getUserChat);
  //   }

  //   const getChatParticipants = getUserChat.participants.filter(
  //     (user) => user !== userID
  //   );

  //   const findUser = await USER_MODEL.findById(getChatParticipants);

  //   for (let j = 0; j < userChat.length; j++) {
  //     if (userChat[j].participants.length <= 2) {
  //       const getUserID = getChatParticipants;
  //       userChat[j].chatProfile = findUser?.profileImg;
  //       userChat[j].chatName = findUser?.userName;
  //     } else {
  //     }
  //   }
  // }

  // const findUser = await USER_MODEL.findById({ userID });

  // for (let i = 0; i < getChatBasedOnID.length; i++) {
  //   const getUserParticipants = getChatBasedOnID[i]
  //   if (getUserParticipants.participants.length < 2) {

  //   }
  //   else {

  //   }
  // }

  // console.log(userChat);

  // socket.emit("user_chat_response", userChat);

  // console.log("user chats are: ", getChatBasedOnID);
  // console.log("user chats are: ", userChat);
};

export { createNewChat, getUserChat, findParticipants };
