"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../Controllers/user.controller");
const userRouter = (0, express_1.Router)();
userRouter.post("/create_new_user", user_controller_1.createNewUser);
userRouter.post("/login_user", user_controller_1.loginUser);
userRouter.patch("/update_profile", user_controller_1.updateUserProfile);
exports.default = userRouter;
