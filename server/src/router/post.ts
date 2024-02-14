import express, { Router, Request, Response } from "express";
import { PostService } from "../service/post";
import { Post } from "../model/post";

const postService : PostService = new PostService();

export const postRouter : Router = express.Router();

interface CreatePostRequest extends Request {
    params : {},
    body: {
        author : string,
        content : string,
        page : string,
    }
}

postRouter.get("/", async (
    req : Request<{}, Post[],{}>, res : Response<Post[]>
) => {
    const posts : Post[] = await postService.getPosts();
    res.status(200).send(posts);
})

postRouter.post("/", async (
    req: CreatePostRequest , res : Response<string>
) => {
    if (typeof(req.body.author) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- author has type ${typeof(req.body.author)}`);
        return;
    }
    if (typeof(req.body.content) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- content has type ${typeof(req.body.content)}`);
        return;
    }
    if (typeof(req.body.page) !== "string") {
        res.status(400).send(`Bad POST call to ${req.originalUrl} --- page has type ${typeof(req.body.page)}`);
        return;
    }

    const author : string = req.body.author;
    const content : string = req.body.content;
    const page : string = req.body.page;
    try {
        const newPost = await postService.createPost(author, content, page);
        console.log('Post created:', newPost);

        res.status(201).send("Post created");
    } catch (error : any) {
        console.error('Error creating post:', error.message);

        res.status(400).send("Something went wrong");
    }
})


postRouter.patch("/:id", async (
    req: Request<{ id: string }, {}, Partial<Post>>, // Corrected type definition
    res: Response<string>
) => {
    const id: number = parseInt(req.params.id, 10);
    const updates: Partial<Post> = req.body;
    try {
        await postService.updatePostAttribute(id, updates);
        res.status(200).send("Post changed one or more attributes");
    } catch (error : any) {
        res.status(400).send(error.message); // Handle error
    }
});