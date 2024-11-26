import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import USER_MODEL from "../Models/user.model";
import findUserByID from "../../res/utils";

//* create new user account to db
const createNewUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, email, userPass } = req.body;

    // hash the provided password
    const hashPass = await bcrypt.hash(userPass, 10);

    // create and save a new user in the db
    const Cres = await USER_MODEL.create({
      userName: userName,
      userPass: hashPass,
      email: email,
    });
    res.status(200).json({ user: Cres });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("error on creating new user", errorMessage);
    res.status(500).json({ error: errorMessage });
  }
};

//* login user account from db
const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, userPass } = req.body;

    //* check if user is logging in with userName or email : "method 1"
    // const checkIfEmailOrNameLog = () => {
    //   const checkLog = userName.includes("@")
    //     ? { email: userName }
    //     : { userName };
    //   return checkLog;
    // };

    // const user = await USER_MODEL.findOne(checkIfEmailOrNameLog());

    //* check if user is logging in with userName or email : "method 2"
    const user = await USER_MODEL.findOne({
      $or: [{ email: userName }, { userName }],
    });

    if (!user) {
      res.status(401).json({ error: "UserName or Password are incorrect!" });
      return;
    }

    //* Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(userPass, user.userPass);

    if (!isPasswordValid) {
      res.status(401).json({ error: "UserName or Password are incorrect!" });
      return;
    }

    if (
      (user.userName === userName && isPasswordValid) ||
      (user.email === userName && isPasswordValid)
    ) {
      res.status(200).json({ user });
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("error on login user", errorMessage);
    res.status(500).json({ error: errorMessage });
  }
};

//* check if user is active based on connection with the frontend
const checkIfUserIsActive = async (userID: string, status: string) => {
  console.log("status is ", status);

  try {
    const user = (await findUserByID(userID)) as any;

    if (!user) {
      console.error("Error on updating user status, User cannot be found!");
      return;
    }

    // check if user status is not away
    if (user.status !== "away") {
      user.status = status;
      await user.save();
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("error on login user", errorMessage);
  }
};

//* update user profile
const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id, updatedData, password } = req.body;

    const user = (await findUserByID(_id)) as any;

    if (password === undefined) {
      res.status(500).json({ error: "password must be provided" });
      return;
    }

    if (updatedData === undefined) {
      res.status(500).json({ error: "updatedData is missing" });
      return;
    }

    if (!user) {
      res.status(500).json({ error: "user has not been found!" });
      return;
    }

    //* Compare the provided password with the stored hashed password
    const checkIfPassValid = await bcrypt.compare(password, user.userPass);

    if (!checkIfPassValid) {
      res.status(403).json({ err: "password incorrect" });
      return;
    }

    //* hash the new provided password
    const updateAndHashPass = await bcrypt.hash(
      updatedData.userPass || user.userPass,
      10
    );

    user.userName = updatedData.userName || user.userName;
    user.email = updatedData.email || user.email;
    user.userPass = updateAndHashPass || user.userPass;

    const response = await user.save();

    res.status(200).json({ user: response });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("error ", errorMessage);
    res.status(500).json({ error: errorMessage });
  }
};

//* check if USER_MODEL is connected
const updateUserStatus = async (userID: string, status: string) => {
  try {
    const user = (await findUserByID(userID)) as any;

    if (!user) {
      console.error("Error on updating user status, User cannot be found!");
      return;
    }

    user.status = status;
    await user.save();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("error on update user status", errorMessage);
  }
};

const updateUserProfileImg = async (req: Request, res: Response) => {
  try {
    const { _id, profileImg } = req.body;
    const user = (await findUserByID(_id)) as any;

    if (!user) {
      res.status(403).json({ err: "user is not found!" });
      return;
    }

    user.profileImg = profileImg || user.profileImg;
    const response = await user.save();

    res.status(200).json({ response });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("error on update user profile", errorMessage);
  }
};

export {
  createNewUser,
  loginUser,
  checkIfUserIsActive,
  updateUserProfile,
  updateUserStatus,
  updateUserProfileImg,
};
