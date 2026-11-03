import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";
import authRouter from "./routes/auth.route.js"

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

authRouter.use("/auth", authRouter);

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is listening on port ${port}`)
})

