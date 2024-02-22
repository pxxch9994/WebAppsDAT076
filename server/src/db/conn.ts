import mongoose, { connect, createConnection, connection, MongooseOptions } from "mongoose";
//const conn = createConnection("mongodb+srv://anjatomovic01:webbapplikationer@cluster0.fgaca4g.mongodb.net/");
const uri = "mongodb+srv://anjatomovic01:webbapplikationer@cluster0.fgaca4g.mongodb.net/";

// Connects to MongoDB
export async function connectToDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('Successfully connected to MongoDB using Mongoose');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        throw new Error('Failed to connect to MongoDB');
    }
}

