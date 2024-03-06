import mongoose, { Document, Schema, Model, model } from 'mongoose';

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
// Model for the Pet schema
const PetModel = mongoose.model<IPet>('Pet', petSchema);
export { PetModel };