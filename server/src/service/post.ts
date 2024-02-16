import {Post} from "../model/post";
import { postModel } from "../db/post.db";
import { userModel } from "../db/user.db";
import { petModel } from "../db/pet.db";
import { error } from "console";


export interface PostWithoutId extends Omit<Post, 'id'> {}
type UpdatePostInput = Partial<Pick<Post, 'content' | 'page' | 'pet'>>;

export class PostService {
    //Returns a post by Id
    async getPost(id: number): Promise<Post | null> {
        try {
            const post = await postModel.findById(id);
            return post ? post.toObject() : null;
        } catch (error) {
            throw error;
        }
    }
    // Returns the current list of posts
    async getPosts() : Promise<Post[]> {
        try {
            const posts = await postModel.find();
            return posts.map(post => post.toObject());
        } catch (error){
            console.error("Failed getting all posts");
            throw error;
        }
    }

    // Create a post with a given attributes
    // Returns the created post
    async createPost(author: string, content: string, page: string, petId: number) : Promise<PostWithoutId> {
        try {
            //Check if author exists
            const exisitingAuthor = await userModel.findOne({ username: author });
            if (!exisitingAuthor){
                throw new Error('Author not found');
            }
            //Check if pet exists
            const exisitingPet = await petModel.findById(petId);
            if(!exisitingPet){
                throw new Error('Pet not found');
            }

            //Create new post in the database
            const newPost = await postModel.create({
                author,
                content,
                page,
                pet: exisitingPet,
            });

            return newPost.toObject();
        } catch (error){
            console.error("Failed creating new post");
            throw error; 
        }
    }

    async updatePostAttribute(id: number, updates: UpdatePostInput): Promise<void> {
        try {
            const updatedPost = await postModel.findByIdAndUpdate(
                id,
                {$set: updates},
                {new: true}
            );

            if(!updatedPost){
                throw new Error('Post not found');
            }
        } catch (error){
            console.error("Failed updating post");
            throw error;
        }
    }

    async deletePost(id: number): Promise<void>{
        try {
            const deletedPost = await postModel.findByIdAndDelete(id);

            if(!deletedPost){
                throw new Error('Post not found');
            }
        } catch (error){
            console.error("Failed deleting post");
            throw error;
        }
    }
}