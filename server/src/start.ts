import express from "express";
import { userRouter } from "./router/userRouter";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);


//Exports
export{app};