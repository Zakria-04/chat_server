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
});

const USER_MODEL = model("chat_user", user_schema);
export default USER_MODEL;
