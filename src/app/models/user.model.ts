import { Role } from "../components/enums/role.enum";

export interface IUser {
    userId: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    role: Role,
}