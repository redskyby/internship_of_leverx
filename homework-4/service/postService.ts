import postRepository from "../repositories/postRepository";
import newPost from "../simpleDatabase/newPost";
import { Post } from "../interfaces/post";

class PostService {
    async checkPost(key: keyof Post, staff: string | number): Promise<Post | undefined> {
        const candidate = postRepository.findBy(key, staff);

        if (candidate) {
            throw new Error("Пост с таким названием уже существует!");
        }

        return candidate;
    }
    async createPost(title: string, description: string, userName: string) {
        const newId = postRepository.getLength() + 1;

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

    findIndex(id: number): void {
        const candidate = postRepository.findIndex(id);

        if (candidate === -1) {
            throw new Error("Постов с таким id не существует!");
        }
        postRepository.deletePost(candidate);
    }

    async checkPostAuthor(key: keyof Post, staff: string | number): Promise<Post | undefined> {
        const candidate = postRepository.findBy(key, staff);

        if (!candidate) {
            throw new Error("Постов с таким не автором  существует!");
        }

        return candidate;
    }

    async updatePostById(key: keyof Post, staff: string | number, title: string, description: string): Promise<Post> {
        const candidate = postRepository.findBy(key, staff);

        if (!candidate) {
            throw new Error("Постов с таким не id  существует!");
        }

        candidate.title = title;
        candidate.description = description;

        return candidate;
    }
}

export default new PostService();
