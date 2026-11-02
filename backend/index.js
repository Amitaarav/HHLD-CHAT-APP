import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv, { config } from "dotenv"

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();

const port = process.env.PORT || 5000;

io.on("connection", () => {
    
})
app.get("/", (req, res)=>{
    res.send("Congratulations HHLD folks!")
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})