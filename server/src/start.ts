import express from "express";
import { userRouter } from "./router/user";

export const app = express();

app.use(express.json());
app.use("/user", userRouter);