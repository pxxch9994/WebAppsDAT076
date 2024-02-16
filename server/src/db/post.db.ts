import { Schema, Model } from "mongoose";
import { Post } from "../model/post";
import { petSchema } from "./pet.db";
import { conn } from "./conn";

const postSchema : Schema = new Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    }, 
    author : {
        type : String,
        ref : "User",  
        required : true
    }, 
    image : {
        type : Image, 
        required : true
    }, 
    content : {
        type : String, 
        required : true
    },
    page : {
        type : String,
        required : true
    }, 
    pet : {
        type : petSchema, 
        required : true
    }
})

export const postModel = conn.model<Post>("Post", postSchema);