import chatRouter from "./chat.routes";
import imagesRouter from "./images.routes";
import messageRouter from "./message.routes";
import userRouter from "./user.routes";

const Routes = [userRouter, imagesRouter, messageRouter, chatRouter];

export default Routes;
