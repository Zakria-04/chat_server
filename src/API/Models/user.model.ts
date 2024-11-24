import { model, Schema } from "mongoose";

const user_schema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  userPass: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: "offline",
  },
  profileImg: {
    type: String,
    default: "https://res.cloudinary.com/dvvm7u4dh/image/upload/v1732177776/wizard_4472179_fvv4gr.png",
  },
});

const USER_MODEL = model("chat_user", user_schema);
export default USER_MODEL;
