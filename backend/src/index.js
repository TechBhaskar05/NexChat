import dotenv from 'dotenv';
import express from 'express';
import connectDB from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './lib/socket.js';

dotenv.config({ path: "./.env"});

// const app = express();

app.use(express.json({limit: "100kb"}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERRR: ", error);
        throw error;
    });
    server.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    })
})