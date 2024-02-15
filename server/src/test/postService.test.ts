import { PostService } from "../service/post";

describe("PostService", () => {
  let postService: PostService;

  beforeEach(() => {
    // Initialize a new instance of PostService before each test
    postService = new PostService();
  });

  it("should return an empty array when no posts are added", async () => {
    const posts = await postService.getPosts();
    expect(posts).toEqual([]);
  });

  it("should create a new post and return the created post", async () => {
    const newPost = await postService.createPost("John Doe", "This is the content", "Page 1");

    // Check if the created post has the correct attributes
    expect(newPost.author).toBe("John Doe");
    expect(newPost.content).toBe("This is the content");
    expect(newPost.page).toBe("Page 1");

    // Check if the post is added to the list
    const posts = await postService.getPosts();
    expect(posts).toHaveLength(1);
    expect(posts[0]).toEqual(newPost);
  });

  it("should update the attributes of an existing post", async () => {
    const newPost = await postService.createPost("Jane Smith", "Another post content", "Page 2");
    const postId = newPost.id;

    // Update the post's author
    await postService.updatePostAttribute(postId, { author: "Updated Author" });

    // Retrieve the updated post
    const updatedPost = (await postService.getPosts())[0];

    // Check if the author is updated
    expect(updatedPost.author).toBe("Updated Author");
  });

  it("should reject updating a non-existing post", async () => {
    const nonExistingPostId = 12345;

    // Attempt to update a non-existing post
    await expect(postService.updatePostAttribute(nonExistingPostId, { author: "New Author" })).rejects.toThrowError("Post not found");
  });
});
