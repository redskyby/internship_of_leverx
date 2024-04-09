class newUser {
    id: number;
    name: string;
    lastName: string;
    password: string;
    email: string;
    token: string;

    constructor({
        id,
        name,
        lastName,
        password,
        email,
        token,
    }: {
        id: number;
        name: string;
        lastName: string;
        password: string;
        email: string;
        token: string;
    }) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.token = token;
    }
}

export default newUser;
