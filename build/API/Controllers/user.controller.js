"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfileImg = exports.updateUserStatus = exports.updateUserProfile = exports.checkIfUserIsActive = exports.loginUser = exports.createNewUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const utils_1 = __importDefault(require("../../res/utils"));
//* create new user account to db
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, userPass } = req.body;
        // hash the provided password
        const hashPass = yield bcryptjs_1.default.hash(userPass, 10);
        // create and save a new user in the db
        const Cres = yield user_model_1.default.create({
            userName: userName,
            userPass: hashPass,
            email: email,
        });
        res.status(200).json({ user: Cres });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("error on creating new user", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
});
exports.createNewUser = createNewUser;
//* login user account from db
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield user_model_1.default.findOne({
            $or: [{ email: userName }, { userName }],
        });
        if (!user) {
            console.log(userName);
            res.status(401).json({ error: "UserName or Password are incorrect!" });
            return;
        }
        //* Compare the provided password with the stored hashed password
        const isPasswordValid = yield bcryptjs_1.default.compare(userPass, user.userPass);
        if (!isPasswordValid) {
            res.status(401).json({ error: "UserName or Password are incorrect!" });
            return;
        }
        if ((user.userName === userName && isPasswordValid) ||
            (user.email === userName && isPasswordValid)) {
            res.status(200).json({ user });
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("error on login user", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
});
exports.loginUser = loginUser;
//* check if user is active based on connection with the frontend
const checkIfUserIsActive = (userID, status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("status is ", status);
    try {
        const user = yield (0, utils_1.default)(userID);
        if (!user) {
            console.error("Error on updating user status, User cannot be found!");
            return;
        }
        // check if user status is not away
        if (user.status !== "away") {
            user.status = status;
            yield user.save();
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("error on login user", errorMessage);
    }
});
exports.checkIfUserIsActive = checkIfUserIsActive;
//* update user profile
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, updatedData, password } = req.body;
        const user = yield (0, utils_1.default)(_id);
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
        const checkIfPassValid = yield bcryptjs_1.default.compare(password, user.userPass);
        if (!checkIfPassValid) {
            res.status(403).json({ err: "password incorrect" });
            return;
        }
        //* hash the new provided password
        const updateAndHashPass = yield bcryptjs_1.default.hash(updatedData.userPass || user.userPass, 10);
        user.userName = updatedData.userName || user.userName;
        user.email = updatedData.email || user.email;
        user.userPass = updateAndHashPass || user.userPass;
        const response = yield user.save();
        res.status(200).json({ user: response });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("error ", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
});
exports.updateUserProfile = updateUserProfile;
//* check if USER_MODEL is connected
const updateUserStatus = (userID, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, utils_1.default)(userID);
        if (!user) {
            console.error("Error on updating user status, User cannot be found!");
            return;
        }
        user.status = status;
        yield user.save();
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("error on update user status", errorMessage);
    }
});
exports.updateUserStatus = updateUserStatus;
const updateUserProfileImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, profileImg } = req.body;
        const user = yield (0, utils_1.default)(_id);
        if (!user) {
            res.status(403).json({ err: "user is not found!" });
            return;
        }
        user.profileImg = profileImg || user.profileImg;
        const response = yield user.save();
        res.status(200).json({ response });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("error on update user profile", errorMessage);
    }
});
exports.updateUserProfileImg = updateUserProfileImg;
