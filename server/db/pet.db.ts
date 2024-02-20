


import {Schema, Model} from "mongoose";

import { Pet } from "../src/model/pet";

import { conn } from "./conn";



const petSchema : Schema = new Schema({
    id : {

        type : Number,

        required : true,

        unique: true

    },

    owner : {

        type : String,

        required : true

    },
    ownerEmail : {

        type : String,

        required : true

    },
    name : {

        type : String,

        required : true

    },
    image : {

        type : String,

        required : true

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

    },
    description : {

        type : String,

        required : true

    }

});

export const petModel = conn.model<Pet>("Pet", petSchema);



