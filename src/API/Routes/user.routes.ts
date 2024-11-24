import { Router } from "express";
import {
  checkIfUserIsActive,
  createNewUser,
  loginUser,
  updateUserProfile,
  updateUserProfileImg,
} from "../Controllers/user.controller";

const userRouter = Router();

userRouter.post("/create_new_user", createNewUser);
userRouter.post("/login_user", loginUser);
userRouter.patch("/update_profile", updateUserProfile);
userRouter.patch("/update_profile_img", updateUserProfileImg);

export default userRouter;
