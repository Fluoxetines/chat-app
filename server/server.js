const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log(" UNCAUGHT Exception! Shutting down ...");
  process.exit(1);
});

const app = require("./app");

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const { promisify } = require("util");
const User = require("./models/UserModel");
const FriendRequest = require("./models/FriendRequestModel");
const Message = require("./models/MessageModel");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
  },
});

mongoose.connect(process.env.MONGODB_URL).then((x) => {
  console.log("DB Connection successfully !");
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port ${port} ...`);
});

io.on("connection", async (socket) => {
  console.log(JSON.stringify(socket.handshake.query));
  const user_id = socket.handshake.query["user_id"];

  console.log(`User connected ${socket.id}`);

  if (Boolean(user_id)) {
    await User.findByIdAndUpdate(user_id, {
      socket_id: socket.id,
      status: "Online",
    });
  }

  socket.on("friend_request", async (date) => {
    const to = await User.findById(data.to).select("socket_id");
    const from = await User.findById(data.from).select("socket_id");

    await FriendRequest.create({
      sender: data.from,
      recipient: data.to,
    });

    io.to(to.socket_id).emit("new_friend_request", {
      message: "New friend request received",
    });
    io.to(from.socket_id).emit("request_sent", {
      message: "Request Sent successfully !",
    });
  });

  socket.on("accept_request", async (data) => {
    console.log(data);
    const request_doc = await FriendRequest.findById(data.request_id);

    console.log(request_doc);

    const sender = await User.findById(request_doc.sender);
    const receiver = await User.findById(request_doc.recipient);

    sender.friends.push(request_doc.recipient);
    receiver.friends.push(request_doc.sender);

    await receiver.save({ new: true, validateModifiedOnly: true });
    await sender.save({ new: true, validateModifiedOnly: true });

    await FriendRequest.findByIdAndDelete(data.request_id);

    io.to(sender.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
    io.to(receiver.socket_id).emit("request_accepted", {
      message: "Friend Request Accepted",
    });
  });
});
