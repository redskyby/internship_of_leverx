import users from "../simpleDatabase/simpeDatabaseOfUsers";
import User from "../interfaces/interfaceOfUser";

class UserRepository {
    findBy<T>(prop: keyof User, value: string | number): User | undefined {
        return users.find((user: User) => user[prop] === value);
    }

    createUser(newUser: User): void {
        users.push(newUser);
    }
}

export default new UserRepository();
