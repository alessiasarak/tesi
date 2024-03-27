import { Role } from "./role";

export interface User {
    id: number,
    name: string,
    surname: string,
    email: string,
    password: string,

    fk_role: Role
}