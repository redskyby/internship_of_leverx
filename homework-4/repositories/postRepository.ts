import posts from "../simpleDatabase/simpleDatabaseOfPosts";

interface Post {
    id: number;
    title: string;
    description: string;
    createdDate: string;
    authorName: string;
}

class PostRepository {
    findBy<T>(prop: keyof Post, value: string | number): Post | undefined {
        return posts.find((post: Post) => post[prop] == value);
    }

    createPost(newPost: Post): void {
        posts.push(newPost);
    }

    checkLength(): number {
        return posts.length;
    }

    filterPost(prop: keyof Post, value: string | number): Post[] {
        return posts.filter((item) => item[prop] === value);
    }

    findIndex(id: number): number {
        return posts.findIndex((item: Post) => item.id === id);
    }

    deletePost(id: number) {
        posts.splice(id, 1);
    }
}

export default new PostRepository();
