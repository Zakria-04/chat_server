import { Router } from "express";
import {
  checkIfUserIsActive,
  createNewUser,
  loginUser,
  updateUserProfile,
} from "../Controllers/user.controller";

const userRouter = Router();

userRouter.post("/create_new_user", createNewUser);
userRouter.post("/login_user", loginUser);
userRouter.post("/update_profile", updateUserProfile);

export default userRouter;
