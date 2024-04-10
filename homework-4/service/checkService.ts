import userRepositories from "../repositories/userRepository";
import postRepository from "../repositories/postRepository";

interface User {
    id: number;
    name: string;
    lastName: string;
    password: string;
    email: string;
    token: string;
}

interface Post {
    id: number;
    title: string;
    description: string;
    createdDate: string;
    authorName: string;
}

class CheckService {
    checkUser(key: keyof User, staff: string): User | undefined {
        return userRepositories.findBy(key, staff);
    }

    checkPost(key: keyof Post, staff: string | number): Post | undefined {
        return postRepository.findBy(key, staff);
    }
}

export default new CheckService();
