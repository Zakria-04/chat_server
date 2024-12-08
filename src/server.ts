import app from "./index";
import http from "http";
import * as dotenv from "dotenv";
import { Server as SocketIOServer, Socket } from "socket.io";
import {
  checkIfUserIsActive,
  updateUserStatus,
} from "./API/Controllers/user.controller";
import { findParticipants } from "./API/Controllers/chat.controller";
dotenv.config();

// declaring new key
declare module "socket.io" {
  interface Socket {
    userId?: string;
  }
}

const port = process.env.PORT || 8080;
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    // origin: "https://chat-app-sigma-ashen.vercel.app",
    origin: "http://localhost:3000",
    // origin: [
    //   "*",
    //   "https://chat-3pkb0k0pa-zakria-04s-projects.vercel.app",
    //   "http://localhost:3000",
    // ],
    methods: ["GET", "POST", "PATCH"],
  },
});

io.on("connection", (socket) => {
  // console.log("connected? ", socket.connected);

  // check if user is active
  socket.on("active", async (id) => {
    // created a new key with the value of _id

    socket.userId = id;
    try {
      // change user status based on connection
      await checkIfUserIsActive(id, "online");
    } catch (error) {
      console.error("Error updating active status:", error);
    }
  });

  // update user status
  socket.on("status-change", async (id, status) => {
    console.log("status change", status);

    try {
      await updateUserStatus(id, status);
    } catch (error) {
      console.error("Error updating active status:", error);
    }
  });

  socket.on("get_user_chat", async (data) => {
    console.log("server data", data);
    try {
      await findParticipants(data, socket);
    } catch (error) {
      console.error("ُError", error);
    }
  });

  // check if user has disconnected from the server
  socket.on("disconnect", async (response) => {
    if (socket.userId) {
      try {
        // change user status based on connection
        await checkIfUserIsActive(socket.userId, "offline");
      } catch (error) {
        console.error("Error updating active status:", error);
      }
    }
  });
});

server.listen(port, (err?: string) => {
  if (err) throw new Error(err);

  console.log(
    `server is running on port ${port}\nwaiting for mongoose connection...`
  );
});
