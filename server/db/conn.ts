import mongoose, { Document, Schema, Model, model } from 'mongoose';

const url = 'mongodb://localhost:27017/petcomdb';

// TODO: Refactor by breaking down this code into separate files

// Interface for the Pet model
interface IPet extends Document {
    id: number;
    owner: string;
    ownerEmail: string;
    name: string;
    image: string;
    kind: string;
    breed: string;
    birthday: number;
    status: string;
    description: string;
}

// Definition of the Pet schema
const petSchema = new Schema<IPet>({
    id: { type: Number, required: true, unique: true },
    owner: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    kind: { type: String, required: true },
    breed: { type: String, required: true },
    birthday: { type: Number, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true,
});

// Interface for the User model
interface IUser extends Document {
    username: string;
    name: string;
    email: string;
    password: string;
}

// Definition of the User schema
const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
});

const PetModel = mongoose.model<IPet>('Pet', petSchema);
const UserModel = mongoose.model<IUser>('User', userSchema);

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

export { PetModel, UserModel };