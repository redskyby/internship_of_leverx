import userRepositories from "../repositories/userRepository";
import postRepository from "../repositories/postRepository";
import User from "../interfaces/interfaceOfUser";
import Post from "../interfaces/interfaceOfPost";

class CheckService {
    checkUser(key: keyof User, staff: string): User | undefined {
        return userRepositories.findBy(key, staff);
    }

    checkPost(key: keyof Post, staff: string | number): Post | undefined {
        return postRepository.findBy(key, staff);
    }
}

export default new CheckService();
