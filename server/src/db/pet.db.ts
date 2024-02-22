import mongoose, { Schema, Model } from "mongoose";
import { Pet } from "../model/pet";
import { connectToDatabase } from "./conn";


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
    ownerEmail : {
        type: String, 
        ref: "User",
        required: true,
    },
    name : {
        type : String, 
        required : true
    }, 
    image : {
        type : String
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
    }, 
    status : {
        type : String, 
        required : true
    }
})

export const petModel = mongoose.model<Pet>("Pet", petSchema);