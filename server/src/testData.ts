import { userModel } from "./db/user.db";
import { petModel } from "./db/pet.db";
import { postModel } from "./db/post.db";
import mongoose from 'mongoose';


async function addData() {
    try {
        // Create a new user
        const newUser = await userModel.create({
            username: "john_doe",
            name: "John Doe",
            password: "password123",
        });

        console.log("User created:", newUser);

        // Create a new pet
        const newPet = await petModel.create({
            owner: "john_doe", // Reference to the username in the User model
            name: "Buddy",
            kind: "Dog",
            breed: "Labrador",
            birthday: 1672531200000, // Example birthday (milliseconds since Epoch)
        });

        console.log("Pet created:", newPet);

        // Create a new post
        const newPost = await postModel.create({
            author: "john_doe", // Reference to the username in the User model
            content: "My pet is amazing!",
            page: "General",
            pet: newPet._id, // Reference to the pet's ObjectId
        });

        console.log("Post created:", newPost);
    } catch (error) {
        console.error("Error adding data:", (error as Error).message);
    } finally {
        // Close the MongoDB connection (optional)
        await mongoose.connection.close();
    }
}

// Call the function to add data
addData();
