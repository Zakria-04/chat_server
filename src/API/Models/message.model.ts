import { model, Schema } from "mongoose";

const messageSchema = new Schema({
  chatID: {
    type: String,
    required: true,
  },
  senderID: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: String,
  },
  status: {
    type: String,
  },
  timeStamp: {
    type: String,
    default: new Date(),
  },
});

const MESSAGE_MODEL = model("chat-message", messageSchema);
export default MESSAGE_MODEL;
