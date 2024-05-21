import { Role } from "./role";

export interface User {
    id: number,
    email: string,
    password: string,
    reset_password_token: string, 

    fk_role: Role
}