import { Role } from "./role";

export interface User {
    id: number,
    email: string,
    password: string,

    fk_role: Role
}