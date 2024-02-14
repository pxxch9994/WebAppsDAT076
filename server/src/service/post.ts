import {Post} from "../model/post";

export class PostService {
    private posts : Post[] = [];

    // Returns the current list of posts
    async getPosts() : Promise<Post[]> {
        return JSON.parse(JSON.stringify(this.posts));
    }

    // Create a post with a given attributes
    // Returns the created post
    async createPost(author: string, content: string, page: string) : Promise<Post> {

        let newPost : Post = {
            id : Date.now(),
            author : author,
            image : "image", // TODO
            content : content,
            page : page,
            pet : "pet" // TODO
        }

        this.posts.push(newPost);
        return JSON.parse(JSON.stringify(newPost));
    }

    async updatePostAttribute(id: number, updates: Partial<Post>): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const post: Post| undefined = this.posts.find((t: Post) => parseInt(String(t.id)) === parseInt(String(id)));
            if (post === undefined) {
                // Reject the promise with an error
                reject(new Error('Post not found'));
            } else {
                Object.assign(post, updates);
                // Resolve the promise when the name is successfully changed
                resolve();
            }
        });
    }
}