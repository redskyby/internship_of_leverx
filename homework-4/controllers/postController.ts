import { Request, Response } from "express";
import postService from "../service/postService";
import posts from "../simpleDatabase/simpleDatabaseOfPosts";

class PostController {
    async createPost(req: Request, res: Response) {
        try {
            const { title, description } = req.body;
            const userName = req.user!.name;

            await postService.checkPost("title", title);

            const newPost = await postService.createPost(title, description, userName);

            return res.status(200).json(newPost);
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }

    async showPostByAuthor(req: Request, res: Response) {
        try {
            const { name } = req.user!;

            await postService.checkPostAuthor("authorName", name);

            const result = await postService.filter("authorName", name);

            return res.status(200).json(result);
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }

    async deletePostById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);

            postService.findIndex(id);

            return res.status(200).json({ message: "Пост успешно удален.", posts });
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }
    async updatePostById(req: Request, res: Response) {
        try {
            const { id, title, description } = req.body;

            await postService.updatePostById("id", id, title, description);

            return res.status(200).json({ message: "Пост успешно обновлен.", posts });
        } catch (error: any) {
            console.error(error);
            res.status(404).json(error.message);
        }
    }
}

export default new PostController();
