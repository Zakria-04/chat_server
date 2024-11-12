import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import USER_MODEL from "../Models/user.model";

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

    //* check if user is logging in with userName or email : method 1
    // const checkIfEmailOrNameLog = () => {
    //   const checkLog = userName.includes("@")
    //     ? { email: userName }
    //     : { userName };
    //   return checkLog;
    // };

    // const user = await USER_MODEL.findOne(checkIfEmailOrNameLog());

    //* check if user is logging in with userName or email : method 2
    const user = await USER_MODEL.findOne({
      $or: [{ email: userName }, { userName }],
    });

    if (!user) {
      console.log(userName);

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

export { createNewUser, loginUser };
