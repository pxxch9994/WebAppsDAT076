import express from "express";
import { userRouter } from "./router/userRouter";

const app = express();

app.use(express.json());
app.use("/user", userRouter);


//Exports
export{app};