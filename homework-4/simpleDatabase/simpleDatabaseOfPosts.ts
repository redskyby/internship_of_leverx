interface Post {
    id: number;
    title: string;
    description: string;
    createdDate: string;
    authorName: string;
}

let posts: Post[] = [
    {
        id: 1,
        title: "First post",
        description: "Description of the first post",
        createdDate: "2022-04-05",
        authorName: "Pasha",
    },
    {
        id: 2,
        title: "First post1",
        description: "Description of the first post",
        createdDate: "2022-04-05",
        authorName: "Pasha",
    },
    {
        id: 3,
        title: "Second pos1t",
        description: "Description of the second post",
        createdDate: "2022-04-04",
        authorName: "Jon",
    },
];

export default posts;
