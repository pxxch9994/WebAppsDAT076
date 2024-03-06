import mongoose from 'mongoose';
// MongoDB connection URL
const url = "mongodb+srv://dev_user:kyUb62C6mSYoVyEn@cluster0.fgaca4g.mongodb.net/";
// Connects to MongoDB
export async function connectToDatabase() {
    try {
        await mongoose.connect(url);
        console.log('Successfully connected to MongoDB using Mongoose');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
        throw new Error('Failed to connect to MongoDB');
    }
}

