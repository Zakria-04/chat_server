import { model, Schema } from "mongoose";

const chatSchema = new Schema({
  chatID: {
    type: String,
    required: true,
    unique: true,
  },
  participants: {
    type: [String],
    required: true,
    default: [],
  },
});

const CHAT_MODEL = model("user-chat", chatSchema);
export default CHAT_MODEL;
