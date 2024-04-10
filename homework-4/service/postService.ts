import checkService from "./checkService";
import postRepository from "../repositories/postRepository";
import newPost from "../simpleDatabase/newPost";
import Post from "../interfaces/interfaceOfPost";

class PostService {
    async checkPost(key: keyof Post, staff: string | number) {
        const candidate = await checkService.checkPost(key, staff);
        return candidate;
    }
    async createPost(title: string, description: string, userName: string) {
        const newId = postRepository.checkLength() + 1;

        const newPostInDatabase = new newPost({
            id: newId,
            title: title,
            description: description,
            createdDate: String(new Date()),
            authorName: userName,
        });

        await postRepository.createPost(newPostInDatabase);
        return newPostInDatabase;
    }

    async filter(key: keyof Post, staff: string | number) {
        return postRepository.filterPost(key, staff);
    }

    findIndex(id: number): number {
        return postRepository.findIndex(id);
    }

    deletePost(id: number) {
        postRepository.deletePost(id);
    }

    updatePost(candidate: Post, title: string, description: string): Post {
        candidate.title = title;
        candidate.description = description;

        return candidate;
    }
}

export default new PostService();
