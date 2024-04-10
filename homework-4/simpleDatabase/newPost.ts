class newPost {
    id: number;
    title: string;
    description: string;
    createdDate: string;
    authorName: string;

    constructor({
        id,
        title,
        description,
        createdDate,
        authorName,
    }: {
        id: number;
        title: string;
        description: string;
        createdDate: string;
        authorName: string;
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.authorName = authorName;
    }
}
export default newPost;
