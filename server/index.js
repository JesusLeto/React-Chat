const express = require("express");
const app = express()
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

app.use(express.json())

app.get("/" , (req, res) => {
    res.sendFile(__dirname + "/index.html")
    res.status(200)
})

io.on("connection", (Socket) => {
  let UserName = null;
  let UserRoom = null;

  Socket.on("Join_room", ({Name, Room}) => {
    Socket.join(Room)
    UserName = Name
    UserRoom = Room
    Socket.emit("HostId", {
      HostId: Socket.id
    })
  })

  Socket.on("New_Message", ({message}) => {
    console.log("Message send:", Socket.id)
    io.to(UserRoom).emit("Responce_Message", {
      message : message,
      id : Socket.id
    })
  })
})

server.listen(8004, () => {
    console.log("Server working...")
})