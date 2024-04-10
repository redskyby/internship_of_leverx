import checkService from "./checkService";
import postRepository from "../repositories/postRepository";
import newPost from "../simpleDatabase/newPost";

interface Post {
    id: number;
    title: string;
    description: string;
    createdDate: string;
    authorName: string;
}

class PostService {
    async checkPost(key : keyof Post , staff : string) {

        const candidate = await checkService.checkPost(key ,staff )
        return candidate;

    }
    async createPost(title : string , description : string , userName : string){

        const newId = await postRepository.checkLenght() +  1;
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

}

export default new PostService();