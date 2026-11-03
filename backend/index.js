import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv"
import cors from "cors"

const app = express();
app.use(cors());

dotenv.config();

const port = process.env.PORT || 5000;

const server = http.createServer(app);

// io is an instance of the socket.IO server class is associated with and attached to the HTTP server
const io = new Server(server, {
    cors: {
        allowedHeaders: ["*"],
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("client connected");

    socket.on('chat msg', (msg) => {
        console.log("recieved message from client", msg);
        io.emit("chat msg", msg);
    })

})

app.get("/", (req, res)=>{
    res.send("Congratulations HHLD folks!")
});

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})