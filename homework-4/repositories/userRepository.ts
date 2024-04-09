import users from "../simpleDatabase/simpeDatabaseOfUsers";

interface User {
    id: number;
    name: string;
    lastName: string;
    password: string;
    email: string;
    token: string;
}
class UserRepository {
    findByEmail(email: string): User | undefined {
        return users.find((user: User) => user.email === email);
    }

    createUser(newUser: User): void {
        users.push(newUser);
    }
}

export default new UserRepository();
