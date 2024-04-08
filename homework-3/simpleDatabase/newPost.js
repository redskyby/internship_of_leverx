class newPost {
    id;
    title;
    description;
    createdDate;
    authorName;

    constructor(id, title, description, createdDate, authorName) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.createdDate = createdDate;
        this.authorName = authorName;
    }
}
module.exports = newPost;
