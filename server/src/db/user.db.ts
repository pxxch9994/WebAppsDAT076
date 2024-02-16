import { Schema, Model } from "mongoose";
import { User } from "../model/user";
import { conn } from "./conn";

const userSchema : Schema = new Schema({
    username : {
        type : Number,
        required : true,
        unique : true
    }, 
    name : {
        type : String, 
        required : true
    }, 
    password : {
        type : String, 
        required : true
    }
})

export const userModel = conn.model<User>("User", userSchema);