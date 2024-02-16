import { Schema, Model } from "mongoose";
import { Pet } from "../model/pet";
import { conn } from "./conn";


export const petSchema : Schema = new Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    }, 
    owner : {
        type : String,
        ref : "User",  
        required : true
    }, 
    name : {
        type : String, 
        required : true
    }, 
    image : {
        type : Image
    },
    kind : {
        type : String,
        required : true
    }, 
    breed : {
        type : String, 
        required : true
    }, 
    birthday : {
        type : Number,
        required : true
    }
})

export const petModel = conn.model<Pet>("Pet", petSchema);