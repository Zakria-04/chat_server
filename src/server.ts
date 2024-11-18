import app from "./index";
import http from "http";
import * as dotenv from "dotenv";
import { Server as SocketIOServer, Socket } from "socket.io";
import { checkIfUserIsActive } from "./API/Controllers/user.controller";
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
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // received user _id from frontend
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
