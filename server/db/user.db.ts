import mongoose, { Document, Schema, Model, model } from 'mongoose';
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
// Model for the User schema
const UserModel = mongoose.model<IUser>('User', userSchema);
export { UserModel };


