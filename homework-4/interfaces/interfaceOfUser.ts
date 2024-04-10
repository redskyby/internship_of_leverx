export default interface User {
    id: number;
    name: string;
    lastName: string;
    password: string;
    email: string;
    token: string;
    // Для jwt токена
    iat?: number;
    exp?: number;
}
