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
exports.loginUser = exports.createNewUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../Models/user.model"));
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
        //* check if user is logging in with userName or email : method 1
        // const checkIfEmailOrNameLog = () => {
        //   const checkLog = userName.includes("@")
        //     ? { email: userName }
        //     : { userName };
        //   return checkLog;
        // };
        // const user = await USER_MODEL.findOne(checkIfEmailOrNameLog());
        //* check if user is logging in with userName or email : method 2
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
